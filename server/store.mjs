import Database from "better-sqlite3";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  chmodSync,
} from "node:fs";
import { join } from "node:path";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export function createStore(config) {
  mkdirSync(config.dataDir, { recursive: true, mode: 0o700 });
  chmodSync(config.dataDir, 0o700);
  let key;
  if (config.encryptionKey) key = Buffer.from(config.encryptionKey, "hex");
  else {
    const keyPath = join(config.dataDir, ".encryption-key");
    if (!existsSync(keyPath))
      writeFileSync(keyPath, randomBytes(32).toString("hex"), {
        mode: 0o600,
        flag: "wx",
      });
    key = Buffer.from(readFileSync(keyPath, "utf8").trim(), "hex");
  }
  if (key.length !== 32)
    throw new Error(
      "The data encryption key is invalid. Do not replace a key for an existing database.",
    );
  const dbPath = join(config.dataDir, "enquiries.sqlite");
  const db = new Database(dbPath);
  chmodSync(dbPath, 0o600);
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = FULL");
  db.pragma("secure_delete = ON");
  db.exec(readFileSync(new URL("./schema.sql", import.meta.url), "utf8"));

  const tableRow = db
    .prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='enquiries'")
    .get();
  if (tableRow && !tableRow.sql.includes("career")) {
    db.exec(`
      PRAGMA foreign_keys=off;
      BEGIN TRANSACTION;
      CREATE TABLE enquiries_new (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        kind TEXT NOT NULL CHECK(kind IN ('contact', 'service', 'amc', 'partnership', 'career')),
        status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'closed')),
        ciphertext BLOB NOT NULL,
        iv BLOB NOT NULL,
        auth_tag BLOB NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        consent_version TEXT NOT NULL DEFAULT '2026-01'
      );
      INSERT INTO enquiries_new SELECT * FROM enquiries;
      DROP TABLE enquiries;
      ALTER TABLE enquiries_new RENAME TO enquiries;
      CREATE INDEX IF NOT EXISTS enquiries_created_at ON enquiries(created_at);
      COMMIT;
      PRAGMA foreign_keys=on;
    `);
  }

  const insert = db.prepare(
    "INSERT INTO enquiries (id, created_at, kind, ciphertext, iv, auth_tag, token_hash) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  const purge = () =>
    db
      .prepare("DELETE FROM enquiries WHERE created_at < ?")
      .run(new Date(Date.now() - config.retentionDays * 86400000).toISOString())
      .changes;
  const decrypt = (row) => {
    const cipher = createDecipheriv("aes-256-gcm", key, row.iv);
    cipher.setAAD(Buffer.from(row.id));
    cipher.setAuthTag(row.auth_tag);
    return {
      id: row.id,
      createdAt: row.created_at,
      kind: row.kind,
      status: row.status,
      consentVersion: row.consent_version,
      data: JSON.parse(
        Buffer.concat([cipher.update(row.ciphertext), cipher.final()]).toString(
          "utf8",
        ),
      ),
    };
  };
  purge();

  const feedbackCount = db
    .prepare("SELECT COUNT(*) as count FROM feedback")
    .get()?.count;
  if (!feedbackCount) {
    const seedReviews = [
      {
        id: "FB-SEEDA1",
        name: "Rahul Sharma",
        service: "Air Conditioners",
        rating: 5,
        comment:
          "Prompt AC servicing before summer peak. The technician arrived on time, thoroughly cleaned both indoor and outdoor units, checked gas pressure, and gave clear preventive advice.",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        id: "FB-SEEDA2",
        name: "Priya Venkatesh",
        service: "Washing Machines",
        rating: 5,
        comment:
          "Repaired our front-load washing machine drum issue with genuine parts. The diagnosis was honest and transparent, unlike other repair providers we called previously.",
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
      {
        id: "FB-SEEDA3",
        name: "Aniket Kulkarni",
        service: "AMC & Maintenance",
        rating: 5,
        comment:
          "Enrolled in the Comprehensive AMC for our home appliances. The scheduled maintenance visit was super smooth and thorough. Great value and peace of mind.",
        createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
      },
      {
        id: "FB-SEEDA4",
        name: "Sunita Deshmukh",
        service: "Refrigerators",
        rating: 4,
        comment:
          "Technician fixed our double-door refrigerator's cooling coil problem within an hour. Professional behavior, wore shoe covers, and left the work area clean.",
        createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
      },
      {
        id: "FB-SEEDA5",
        name: "Vikram Patel",
        service: "Televisions",
        rating: 5,
        comment:
          "Professional wall-mounting and display calibration for our 65-inch television. Clean wire routing and proper bracket alignment. Very impressed with the care taken.",
        createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
      },
      {
        id: "FB-SEEDA6",
        name: "Meera Nair",
        service: "Water Purifiers",
        rating: 5,
        comment:
          "Quick membrane replacement and complete sanitization for our RO water purifier. Checked water TDS level before and after service. Courteous technician.",
        createdAt: new Date(Date.now() - 32 * 86400000).toISOString(),
      },
    ];

    const insertSeed = db.prepare(
      "INSERT INTO feedback (id, created_at, name, service, rating, comment, verified, status) VALUES (?, ?, ?, ?, ?, ?, 1, 'published')",
    );
    for (const r of seedReviews) {
      insertSeed.run(r.id, r.createdAt, r.name, r.service, r.rating, r.comment);
    }
  }

  return {
    key,
    db,
    purge,
    save(kind, data, tokenHash) {
      const id = `CP-${randomBytes(6).toString("hex").toUpperCase()}`;
      const iv = randomBytes(12);
      const cipher = createCipheriv("aes-256-gcm", key, iv);
      cipher.setAAD(Buffer.from(id));
      const encrypted = Buffer.concat([
        cipher.update(JSON.stringify(data), "utf8"),
        cipher.final(),
      ]);
      insert.run(
        id,
        new Date().toISOString(),
        kind,
        encrypted,
        iv,
        cipher.getAuthTag(),
        tokenHash,
      );
      return id;
    },
    hasToken(hash) {
      return Boolean(
        db.prepare("SELECT 1 FROM enquiries WHERE token_hash = ?").get(hash),
      );
    },
    list() {
      purge();
      return db
        .prepare(
          "SELECT id, created_at, kind, status FROM enquiries ORDER BY created_at DESC",
        )
        .all();
    },
    get(id) {
      const row = db.prepare("SELECT * FROM enquiries WHERE id = ?").get(id);
      return row ? decrypt(row) : null;
    },
    exportAll() {
      purge();
      return db
        .prepare("SELECT * FROM enquiries ORDER BY created_at DESC")
        .all()
        .map(decrypt);
    },
    setStatus(id, status) {
      return db
        .prepare("UPDATE enquiries SET status = ? WHERE id = ?")
        .run(status, id).changes;
    },
    remove(id) {
      return db.prepare("DELETE FROM enquiries WHERE id = ?").run(id).changes;
    },
    saveFeedback({ name, service, rating, comment, verified = 1 }) {
      const id = `FB-${randomBytes(6).toString("hex").toUpperCase()}`;
      const createdAt = new Date().toISOString();
      db.prepare(
        "INSERT INTO feedback (id, created_at, name, service, rating, comment, verified, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'published')",
      ).run(id, createdAt, name, service, rating, comment, verified ? 1 : 0);
      return {
        id,
        createdAt,
        name,
        service,
        rating,
        comment,
        verified: Boolean(verified),
        status: "published",
      };
    },
    getFeedbackList(service = null) {
      const query = service
        ? "SELECT id, created_at as createdAt, name, service, rating, comment, verified FROM feedback WHERE status = 'published' AND service = ? ORDER BY created_at DESC"
        : "SELECT id, created_at as createdAt, name, service, rating, comment, verified FROM feedback WHERE status = 'published' ORDER BY created_at DESC";
      const rows = service
        ? db.prepare(query).all(service)
        : db.prepare(query).all();
      return rows.map((r) => ({ ...r, verified: Boolean(r.verified) }));
    },
    getFeedbackSummary() {
      const stats = db
        .prepare(
          "SELECT COUNT(*) as total, AVG(rating) as average FROM feedback WHERE status = 'published'",
        )
        .get();
      const counts = db
        .prepare(
          "SELECT rating, COUNT(*) as count FROM feedback WHERE status = 'published' GROUP BY rating",
        )
        .all();
      const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      for (const item of counts) {
        breakdown[item.rating] = item.count;
      }
      return {
        total: stats.total || 0,
        average: stats.average ? Math.round(stats.average * 10) / 10 : 5.0,
        breakdown,
      };
    },
    close() {
      db.close();
    },
  };
}

