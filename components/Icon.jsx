export default function Icon({ children, className = "" }) {
  return <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(15,41,23,.06)] ${className}`}>{children}</div>;
}

export function Arrow({ direction = "right" }) {
  return direction === "right" ? <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></> : <polyline points="15 18 9 12 15 6" />;
}
