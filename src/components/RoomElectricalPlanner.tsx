import { useState } from "react";
import {
  Home,
  Tv,
  UtensilsCrossed,
  Droplets,
  Car,
  Trees,
  CheckCircle2,
  Zap,
  ShieldAlert,
} from "lucide-react";

interface RoomPlan {
  id: string;
  name: string;
  icon: typeof Home;
  pointsSummary: Array<{
    category: string;
    items: string[];
    wireGauge: string;
    breakerProtection: string;
  }>;
  futureProofingTip: string;
}

const roomPlans: RoomPlan[] = [
  {
    id: "living",
    name: "Living Room",
    icon: Tv,
    pointsSummary: [
      {
        category: "Lighting & Ceiling Fans",
        items: [
          "2–3 Ceiling Fan points with electronic step regulators",
          "8–12 Recessed ceiling LED downlights (4000K Neutral White)",
          "Perimeter false-ceiling cove light strip (3000K Warm White)",
        ],
        wireGauge: "1.0 sq. mm FRLS Copper",
        breakerProtection: "10A C-Curve MCB",
      },
      {
        category: "Entertainment TV Unit Cluster",
        items: [
          "1 Modular switchboard with 4x 6A multi-pin sockets (Smart TV, Set-top box, Soundbar, Gaming Console)",
          "1 Concealed CAT-6 Ethernet RJ45 data point straight to home router",
          "1 Coaxial cable conduit for dish antenna",
        ],
        wireGauge: "1.5 sq. mm FRLS Copper",
        breakerProtection: "10A / 16A MCB with Type 2 SPD surge protection",
      },
      {
        category: "Climate Control (Air Conditioner)",
        items: [
          "1 Dedicated 16A/20A modular power point with DP switch at 7ft height for 1.5T / 2.0T Split AC",
          "Independent Phase, Neutral, and Earth wire run directly to the main DB",
        ],
        wireGauge: "4.0 sq. mm FRLS Copper (Crucial to prevent voltage drop)",
        breakerProtection: "20A or 25A C-Curve MCB",
      },
      {
        category: "General Utilities & Cleaning",
        items: [
          "3–4 Strategic 6A utility sockets for vacuum cleaner, mobile chargers, and decorative floor lamps",
        ],
        wireGauge: "1.5 sq. mm FRLS Copper",
        breakerProtection: "16A MCB + 30mA RCCB",
      },
    ],
    futureProofingTip: "Always pull a neutral wire into every switchboard, even if not immediately needed. Smart Wi-Fi home automation switches require a continuous neutral wire to power their microchips.",
  },
  {
    id: "bedroom",
    name: "Bedrooms",
    icon: Home,
    pointsSummary: [
      {
        category: "Bedside Switchboards (Both Sides)",
        items: [
          "2x 6A sockets on each side of the bed for smartphone and laptop charging",
          "Two-way control switches for master ceiling light and ceiling fan",
        ],
        wireGauge: "1.5 sq. mm FRLS Copper",
        breakerProtection: "10A / 16A MCB",
      },
      {
        category: "Bedroom AC & Climate",
        items: [
          "1 Dedicated 16A/20A power point with matching DP isolator switch for Split AC",
          "Concealed drain pipe and copper tubing conduit route planned in tandem",
        ],
        wireGauge: "4.0 sq. mm FRLS Copper directly from DB",
        breakerProtection: "20A C-Curve MCB",
      },
      {
        category: "Wardrobe & Dressing Area",
        items: [
          "1 6A socket near mirror for hair dryer, trimmer, or straightener",
          "1 Dedicated overhead profile light point above wardrobe mirror",
        ],
        wireGauge: "1.0 / 1.5 sq. mm FRLS Copper",
        breakerProtection: "10A MCB",
      },
    ],
    futureProofingTip: "Position the AC power point and outdoor unit sleeve on an exterior wall to avoid running ugly surface drain and refrigerant pipes across the bedroom.",
  },
  {
    id: "kitchen",
    name: "Kitchen & Utility",
    icon: UtensilsCrossed,
    pointsSummary: [
      {
        category: "Heavy Countertop Appliances",
        items: [
          "1 Dedicated 16A point for Microwave / Convection Oven",
          "1 Dedicated 16A point for Mixer-Grinder / Food Processor",
          "1 Dedicated 16A point for Induction Cooktop or Air Fryer",
        ],
        wireGauge: "2.5 sq. mm FRLS Copper (per circuit)",
        breakerProtection: "16A / 20A MCB + 30mA RCCB",
      },
      {
        category: "Water Purification & Exhaust",
        items: [
          "1 6A/16A socket below or near sink for Under-Sink or Wall RO Purifier",
          "1 High-level 6A power point at 7ft height for Kitchen Chimney",
        ],
        wireGauge: "1.5 sq. mm FRLS Copper",
        breakerProtection: "10A MCB",
      },
      {
        category: "Refrigerator & Dishwasher",
        items: [
          "1 Dedicated 16A point on emergency Inverter Backup circuit for Refrigerator",
          "1 Dedicated 16A point near water inlet and floor drain for Dishwasher",
        ],
        wireGauge: "2.5 sq. mm FRLS Copper (Independent runs)",
        breakerProtection: "16A MCB",
      },
    ],
    futureProofingTip: "The kitchen is your home's highest electrical load center. Never daisy-chain kitchen power sockets together on a single thin wire. Run at least three independent 2.5 sq. mm circuits straight to the main distribution board.",
  },
  {
    id: "bathroom",
    name: "Bathrooms",
    icon: Droplets,
    pointsSummary: [
      {
        category: "Water Heating (Storage Geyser)",
        items: [
          "1 Dedicated 16A/20A Double Pole (DP) switch installed OUTSIDE the bathroom door with indicator light",
          "1 Heavy-duty ceiling/wall connection point inside bathroom for 15L/25L Storage Geyser",
        ],
        wireGauge: "4.0 sq. mm FRLS Copper directly from DB",
        breakerProtection: "20A MCB + 30mA RCCB (Mandatory for shock safety)",
      },
      {
        category: "Vanity & Grooming",
        items: [
          "1 Shuttered 6A socket at 4.5ft height near mirror vanity (strictly outside shower spray zone)",
          "1 Overhead vanity mirror light point + 1 Exhaust fan point",
        ],
        wireGauge: "1.5 sq. mm FRLS Copper",
        breakerProtection: "10A MCB + 30mA RCCB",
      },
    ],
    futureProofingTip: "Water and electricity are a fatal combination. All bathroom electrical points MUST be routed through a 30mA Residual Current Circuit Breaker (RCCB). If a geyser heating element develops insulation leakage, the RCCB trips in 25 milliseconds, preventing electrocution.",
  },
  {
    id: "balcony",
    name: "Balcony & Laundry",
    icon: Home,
    pointsSummary: [
      {
        category: "Washing Machine & Dryer Point",
        items: [
          "1 Dedicated 16A waterproof/weatherproof socket with protective flip cover",
          "Co-located adjacent to washing machine water tap inlet and floor drain pipe",
        ],
        wireGauge: "2.5 sq. mm FRLS Copper",
        breakerProtection: "16A MCB + 30mA RCCB",
      },
      {
        category: "Balcony Lighting & Outlets",
        items: [
          "1 Weatherproof ceiling/wall light point (IP65 rated against driving monsoon rain)",
          "1 6A utility socket for seasonal festive lighting or mosquito repellents",
        ],
        wireGauge: "1.0 / 1.5 sq. mm FRLS Copper",
        breakerProtection: "10A MCB",
      },
    ],
    futureProofingTip: "Ensure exterior balcony sockets have spring-loaded silicone waterproof covers. Monsoon moisture entering unprotected open sockets will repeatedly trip your home's main RCCB.",
  },
  {
    id: "garage",
    name: "Garage & EV Parking",
    icon: Car,
    pointsSummary: [
      {
        category: "Electric Vehicle (EV) Home Charger Provision",
        items: [
          "1 Dedicated 16A / 32A industrial metal-clad socket with DP isolator switch",
          "Direct unbroken conduit run from main distribution board to parking bay",
          "Verified Earth-to-Neutral AC voltage strictly < 2.0V (EV smart chargers require solid earthing)",
        ],
        wireGauge: "4.0 sq. mm (for 16A 3.3kW charger) or 6.0 sq. mm (for 32A 7.2kW fast wallbox)",
        breakerProtection: "25A / 40A C-Curve MCB + 30mA Type A RCCB",
      },
      {
        category: "Utility & High-Pressure Washer",
        items: [
          "1 16A power socket for high-pressure car wash equipment and vacuuming",
          "1 High-lumen LED batten or floodlight point for nighttime parking safety",
        ],
        wireGauge: "2.5 sq. mm FRLS Copper",
        breakerProtection: "16A MCB",
      },
    ],
    futureProofingTip: "Even if you do not currently drive an electric vehicle, laying an empty 25mm heavy PVC conduit from your main electrical meter to your parking slot during house construction costs almost nothing. Trying to chisel or lay external armored cables later can cost thousands.",
  },
  {
    id: "outdoor",
    name: "Outdoor & Terrace",
    icon: Trees,
    pointsSummary: [
      {
        category: "Boundary & Perimeter Security Lighting",
        items: [
          "Waterproof IP66 LED floodlight points along perimeter walls and gate pillars",
          "Surge-protected outdoor lighting circuit to isolate exterior lighting from interior home power",
        ],
        wireGauge: "1.5 sq. mm UV-resistant outdoor cable",
        breakerProtection: "10A MCB + 30mA RCCB",
      },
      {
        category: "Rooftop Solar PV Provision",
        items: [
          "Concealed empty 32mm PVC conduit connecting rooftop to ground electrical meter room",
          "Dedicated space on exterior ground wall for solar grid-tie inverter and net meter bi-directional box",
        ],
        wireGauge: "Empty conduit for future 6.0–10.0 sq. mm solar DC/AC cabling",
        breakerProtection: "Dedicated 4-Pole Solar Bi-directional MCB/Isolator",
      },
    ],
    futureProofingTip: "Always keep exterior garden and boundary wall lighting on an independent sub-circuit with its own separate RCCB. Monsoon water leaking into an outdoor lamp will not plunge your interior bedrooms and kitchen into darkness.",
  },
];

export default function RoomElectricalPlanner() {
  const [activeRoom, setActiveRoom] = useState("living");
  const selectedPlan = roomPlans.find((r) => r.id === activeRoom) || roomPlans[0];
  const IconComp = selectedPlan.icon;

  return (
    <div className="room-planner-widget" id="electrical-room-planner">
      <div className="room-planner-header">
        <div className="planner-badge">
          <Zap size={16} />
          PRE-CONSTRUCTION PLANNING TOOL
        </div>
        <h3>Interactive Room-Wise Electrical Point Planner</h3>
        <p className="planner-subtitle">
          Select any area of your home to inspect mandatory electrical points, recommended copper wire gauges (sq. mm),
          circuit breaker ratings, and critical future-proofing provisions before your electrician begins chiseling walls.
        </p>
      </div>

      {/* Room Tabs */}
      <div className="room-tabs-nav" role="tablist">
        {roomPlans.map((r) => {
          const TabIcon = r.icon;
          const isActive = r.id === activeRoom;
          return (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`room-tab-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveRoom(r.id)}
            >
              <TabIcon size={16} />
              <span>{r.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Room Detail Card */}
      <div className="room-plan-card">
        <div className="room-plan-card-header">
          <div className="room-title-wrap">
            <div className="room-icon-box">
              <IconComp size={24} />
            </div>
            <div>
              <h4>{selectedPlan.name} — Recommended Electrical Provisions</h4>
              <span className="room-subtitle">Indian Standards (IS 694 &amp; IS 3043) Engineered Guidelines</span>
            </div>
          </div>
        </div>

        <div className="room-provisions-grid">
          {selectedPlan.pointsSummary.map((sec, idx) => (
            <div className="provision-group-card" key={idx}>
              <div className="provision-head">
                <h5>{sec.category}</h5>
                <div className="wire-badge-wrap">
                  <span className="gauge-pill">Wire: {sec.wireGauge}</span>
                  <span className="breaker-pill">Breaker: {sec.breakerProtection}</span>
                </div>
              </div>
              <ul className="provision-items-list">
                {sec.items.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="future-proofing-box">
          <div className="future-icon-box">
            <Zap size={20} />
          </div>
          <div>
            <strong>Future-Proofing &amp; Safety Tip for {selectedPlan.name}:</strong>
            <p>{selectedPlan.futureProofingTip}</p>
          </div>
        </div>
      </div>

      {/* Mandatory Engineering Disclaimer */}
      <div className="planner-disclaimer-alert">
        <ShieldAlert size={20} className="text-amber" />
        <p>
          <strong>Professional Verification Notice:</strong> The specifications, wire gauges, and breaker ratings
          provided above are educational guidelines based on the National Building Code of India (NBC) and IS 694 / IS 3043 standards.
          All final circuit designs, cable sizing, breaker ratings, and electrical load calculations must be verified and executed by a certified, licensed electrical professional.
        </p>
      </div>
    </div>
  );
}
