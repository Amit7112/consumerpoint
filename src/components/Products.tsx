import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../data";
import { Reveal } from "./UI";

export function ProductGrid({
  items = categories,
}: {
  items?: typeof categories;
}) {
  return (
    <div className="product-grid">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={(index % 4) * 0.04}>
          <Link
            className="product-card"
            to={`/contact?type=Service%20Request&category=${encodeURIComponent(item.name)}#enquiry-form`}
            aria-label={`Book service or repair for ${item.name}`}
          >
            <div className="product-image">
              <img
                src={`/images/${item.image}.webp`}
                alt={
                  item.name === "Televisions"
                    ? "Modern flat-screen television wall mounting and display calibration"
                    : `${item.name} repair, installation and maintenance service - Consumer Point`
                }
                width="500"
                height="500"
                loading="lazy"
              />
              <span className="product-arrow">
                <ArrowUpRight size={19} />
              </span>
            </div>
            <div className="product-content">
              <h3>{item.name}</h3>
              <p>{item.short}</p>
              <span className="product-enquire">
                Book Service / Repair
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
