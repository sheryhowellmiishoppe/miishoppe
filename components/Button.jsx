export default function Button({
  children,
  href = "#waitlist",
  light = false,
  type = "button",
  className: customClassName = "",
}) {
  const baseClassName =
    `inline-flex items-center justify-center gap-2 rounded-full border-0 px-[10px] sm:px-[22px] py-[13px] text-[10px] sm:text-[14px] font-bold tracking-[.02em] !text-white shadow-[0_6px_18px_rgba(15,41,23,.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#779f2d] hover:shadow-[0_10px_24px_rgba(119,159,45,.35)] ${light ? "bg-[#779f2d]" : "bg-[#476036]"}`.trim();
  const className = customClassName
    ? `${baseClassName} ${customClassName}`
    : baseClassName;
  const content = (
    <>
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </>
  );
  return type === "submit" || light ? (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={className}
    >
      {content}
    </button>
  ) : (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
