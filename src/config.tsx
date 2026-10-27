import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type BusinessConfig = {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  whatsapp: string;
  mapsUrl: string;
  retentionDays: number;
  coveragePublished: boolean;
};

const defaults: BusinessConfig = {
  name: "Consumer Point",
  phone: "9805350321",
  email: "",
  address: "",
  hours: "Mon - Sat: 9:00 AM - 8:00 PM",
  whatsapp: "919805350321",
  mapsUrl: "",
  retentionDays: 180,
  coveragePublished: false,
};

const BusinessContext = createContext<BusinessConfig>(defaults);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState(defaults);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/config", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const activeData = Object.fromEntries(
          Object.entries(data).filter(
            ([_, v]) => v !== "" && v !== null && v !== undefined,
          ),
        );
        setConfig({ ...defaults, ...activeData });
      })
      .catch(() => {
        /* Defaults remain active if backend config is unavailable. */
      });
    return () => controller.abort();
  }, []);
  return (
    <BusinessContext.Provider value={config}>
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);
export const whatsappUrl = (phone?: string, text?: string) => {
  const target = (phone || "919805350321").replace(/\D/g, "");
  const defaultText =
    "Hello Consumer Point, I would like to enquire about your appliance services.";
  return `https://wa.me/${target}?text=${encodeURIComponent(text || defaultText)}`;
};
