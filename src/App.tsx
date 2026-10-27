import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BusinessProvider } from "./config";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import AMC from "./pages/AMC";
import Careers from "./pages/Careers";
import Partnerships from "./pages/Partnerships";
import Locations from "./pages/Locations";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Legal, { NotFound } from "./pages/Legal";
import { FAQ, PageHero, SEO } from "./components/UI";

export default function App() {
  return (
    <BrowserRouter>
      <BusinessProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="services" element={<Services />} />
            <Route path="amc-maintenance" element={<AMC />} />
            <Route path="amc" element={<Navigate to="/amc-maintenance" replace />} />
            <Route path="careers" element={<Careers />} />
            <Route path="partnerships" element={<Partnerships />} />
            <Route path="service-locations" element={<Locations />} />
            <Route path="contact" element={<Contact />} />
            <Route path="feedback" element={<Feedback />} />
            <Route
              path="faq"
              element={
                <>
                  <SEO
                    title="Frequently Asked Questions"
                    description="Find clear answers about Consumer Point appliance enquiries, repairs, installation, maintenance contracts, locations, and business partnerships."
                  />
                  <PageHero
                    eyebrow="Frequently Asked Questions"
                    title="A little clarity. A better next step."
                  >
                    Answers to the questions that help you get started.
                  </PageHero>
                  <FAQ />
                </>
              }
            />
            <Route path=":policy" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BusinessProvider>
    </BrowserRouter>
  );
}
