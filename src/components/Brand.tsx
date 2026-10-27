import { useId } from "react";
import { Link } from "react-router-dom";

export function BrandMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-blue`}
          x1="27"
          y1="12"
          x2="59"
          y2="53"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00D4EE" />
          <stop offset="1" stopColor="#0875FF" />
        </linearGradient>
        <linearGradient id={`${id}-navy`} x1="0" y1="64" x2="64" y2="0">
          <stop stopColor="#03122F" />
          <stop offset="1" stopColor="#06377C" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="15"
        fill={`url(#${id}-navy)`}
      />
      <path
        d="M29 16C15 15 8 25 8 36c0 12 9 19 21 19V45c-8 0-12-4-12-10 0-7 5-12 12-19Z"
        fill="#fff"
      />
      <path
        d="m20 29 21-18 20 19H50L41 21 30 30H20Z"
        fill={`url(#${id}-blue)`}
      />
      <path
        d="M50 31h9v8c0 8-5 12-13 12h-7v5h-9V43c0-5 3-8 8-8h8c3 0 4-1 4-4Z"
        fill={`url(#${id}-blue)`}
      />
      <path
        d="M36 28h5v5h-5zm7 0h5v5h-5zm-7 7h5v5h-5zm7 0h5v5h-5Z"
        fill="#fff"
      />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Consumer Point home"
    >
      <BrandMark className="brand-mark" />
      <span>
        <span className="brand-name">
          Consumer<span className="brand-point"> Point</span>
        </span>
        <span className="brand-tagline">
          SALES <i /> SERVICE <i /> INSTALLATION
        </span>
      </span>
    </Link>
  );
}
