import { useState } from "react";
import { Info, Search, SearchX } from "lucide-react";
import { categories } from "../data";
import { ProductGrid } from "../components/Products";
import { FinalCTA, PageHero, SEO } from "../components/UI";

export default function Products() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All categories");
  const filtered = categories.filter(
    (item) =>
      (group === "All categories" || item.group === group) &&
      `${item.name} ${item.description}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  return (
    <>
      <SEO
        title="Appliances We Service, Repair & Maintain"
        description="Comprehensive doorstep service, repair, and installation for all major home appliance categories: air conditioners, refrigerators, washing machines, and televisions."
      />
      <PageHero eyebrow="Supported Appliances" title="Appliances We Service, Repair & Maintain">
        From precision air conditioner servicing to front-load washing machines and double-door refrigerators — our verified technicians deliver expert repair, genuine parts, and scheduled maintenance.
      </PageHero>
      <section className="section products-section">
        <div className="container">
          <div className="catalog-toolbar">
            <div className="search-input-wrap">
              <Search size={17} />
              <input
                className="form-control"
                type="search"
                aria-label="Search appliance categories"
                placeholder="Search appliances, e.g. refrigerator"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <select
              className="form-control"
              aria-label="Filter appliance category"
              value={group}
              onChange={(event) => setGroup(event.target.value)}
            >
              {[
                "All categories",
                "Cooling",
                "Laundry",
                "Entertainment",
                "Kitchen",
                "Electrical",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          <div className="catalog-count" aria-live="polite">
            <span>
              {filtered.length} appliance{" "}
              {filtered.length === 1 ? "category" : "categories"} to explore
            </span>
            {(search || group !== "All categories") && (
              <button
                className="reset-button"
                onClick={() => {
                  setSearch("");
                  setGroup("All categories");
                }}
              >
                Reset filters
              </button>
            )}
          </div>
          {filtered.length ? (
            <ProductGrid items={filtered} />
          ) : (
            <div className="empty-state">
              <SearchX size={37} />
              <h2>No match just yet.</h2>
              <p>Try a different appliance name or clear your filters.</p>
              <button
                className="button button-secondary"
                onClick={() => {
                  setSearch("");
                  setGroup("All categories");
                }}
              >
                Show all appliances
              </button>
            </div>
          )}
          <div className="notice catalog-notice">
            <Info size={19} />
            <p>
              These are supported appliance service and maintenance categories. Images
              are illustrative. Service availability, spare parts, and technician scheduling
              must be confirmed by the team. No authorised dealership or retail sales relationship is implied.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
