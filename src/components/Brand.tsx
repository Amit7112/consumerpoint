import { Link } from "react-router-dom";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="16" fill="#06152e" />
      <rect x="6" y="47" width="13" height="4.5" rx="2.25" fill="#0084ff" />
      <path
        d="M32 13C24.82 13 19 18.82 19 26C19 35.5 32 49 32 49C32 49 45 35.5 45 26C45 18.82 39.18 13 32 13Z"
        fill="#ff6b00"
      />
      <circle cx="32" cy="25" r="5.5" fill="#ffffff" />
      <rect x="45" y="47" width="13" height="4.5" rx="2.25" fill="#0084ff" />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Consumer Point Home"
    >
      <div className={`brand-logo-container ${light ? "brand-logo-dark-bg" : ""}`}>
        <img
          src="/images/logo-consumer-point.webp"
          alt="Consumer Point - Sales, Service & Installation"
          className="brand-logo-image"
          width="138"
          height="48"
          loading="eager"
        />
      </div>
    </Link>
  );
}
