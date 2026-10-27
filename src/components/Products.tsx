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
            to={`/contact?type=Product%20Enquiry&category=${encodeURIComponent(item.name)}#enquiry-form`}
            aria-label={`Enquire about ${item.name}`}
          >
            <div className="product-image">
              <img
                src={`/images/${item.image}.webp`}
                alt={
                  item.name === "Televisions"
                    ? "Modern flat-screen television displaying an ocean landscape"
                    : `${item.name} - illustrative appliance photography`
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
                Make an enquiry
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
