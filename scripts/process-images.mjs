import sharp from "sharp";
import { existsSync, readdirSync } from "fs";
import path from "path";

const categories = [
  { file: "categories-one.png", isRight: false, name: "air-conditioner" },
  { file: "categories-one.png", isRight: true, name: "refrigerator" },
  { file: "categories-two.png", isRight: false, name: "washing-machine", customLeft: 30, customWidth: 540, extendLeft: 220, extendRight: 219 },
  { file: "categories-two.png", isRight: true, name: "television", customLeft: 566, customWidth: 680, extendLeft: 150, extendRight: 149 },
  { file: "categories-three.png", isRight: false, name: "geyser" },
  { file: "categories-three.png", isRight: true, name: "kitchen-appliances" },
  { file: "categories-four.png", isRight: false, name: "water-purifier" },
  { file: "categories-four.png", isRight: true, name: "fan" },
];

async function processAll() {
  console.log("Processing product categories...");
  for (const cat of categories) {
    const inputPath = `public/images/${cat.file}`;
    const outputPath = `public/images/${cat.name}.webp`;
    const left = cat.customLeft !== undefined ? cat.customLeft : (cat.isRight ? 640 : 0);
    const width = cat.customWidth !== undefined ? cat.customWidth : 640;
    const extLeft = cat.extendLeft !== undefined ? cat.extendLeft : 170;
    const extRight = cat.extendRight !== undefined ? cat.extendRight : 169;

    // 1. Extract clean subject
    const half = await sharp(inputPath)
      .extract({ left, top: 0, width, height: 720 })
      .toBuffer();

    // 2. Extend horizontally to 1.36 aspect ratio (matching CSS aspect-ratio: 1.36)
    await sharp(half)
      .extend({
        left: extLeft,
        right: extRight,
        extendWith: "copy",
      })
      .resize(680, 500)
      .webp({ quality: 92 })
      .toFile(outputPath);

    console.log(`Saved ${outputPath}`);
  }

  // Hero image
  if (existsSync("public/images/hero-appliances.jpg")) {
    await sharp("public/images/hero-appliances.jpg")
      .webp({ quality: 90 })
      .toFile("public/images/hero-appliances.webp");
    console.log("Saved public/images/hero-appliances.webp");
  }

  // Find generated technician image in brain artifact directory
  const brainDir = "C:\\Users\\LENOVO\\.gemini\\antigravity-ide\\brain\\bcda9c2c-5436-48a0-974c-7b47160286aa";
  const brainFiles = readdirSync(brainDir);
  const techFile = brainFiles.find((f) => f.startsWith("technician_") && f.endsWith(".jpg"));
  if (techFile) {
    await sharp(path.join(brainDir, techFile))
      .resize(1200, 900, { fit: "cover" })
      .webp({ quality: 90 })
      .toFile("public/images/technician.webp");
    console.log("Saved public/images/technician.webp");
  }

  // Find generated kitchen image in brain artifact directory
  const kitchenFile = brainFiles.find((f) => f.startsWith("kitchen_") && f.endsWith(".jpg"));
  if (kitchenFile) {
    await sharp(path.join(brainDir, kitchenFile))
      .resize(1000, 800, { fit: "cover" })
      .webp({ quality: 90 })
      .toFile("public/images/kitchen.webp");
    console.log("Saved public/images/kitchen.webp");
  }

  console.log("All image processing complete!");
}

processAll().catch(console.error);
