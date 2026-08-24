export default function Footer() {
  return (
    <footer
      className="scroll-mt-[90px] border-t border-[#e7e9e5] py-9 pb-11"
    >
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start justify-between gap-6 px-6 max-sm:flex-col max-sm:px-[18px]">
        <div>
          <a href="#top">
            <img
              src="/images/logo.png"
              alt="Mii Shoppe"
              className="h-[60px] w-auto"
            />
          </a>
          <p className=" max-w-[220px] text-[12.5px] leading-[1.6] font-semibold text-[#242424]">
            Access Within Reach.
            <br />© 2026 Mii Shoppe™
            <br />
            All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-[18px] sm:mt-12 font-bold text-[#242424]">
          <a href="#about-us" className="transition hover:text-[#476036]">
            About Us
          </a>
          <a href="#how-it-works" className="transition hover:text-[#476036]">
            How It Works
          </a>
          <a href="#contact" className="transition hover:text-[#476036]">
            Contact
          </a>
        </nav>
        <div className="flex flex-col items-end gap-2.5 max-sm:items-start">
          <a
            href="https://www.instagram.com/shopmiishoppe"
            aria-label="Instagram"
            className="flex h-[60px] w-[60px] items-center justify-center rounded-[9px]  transition "
          >
            <img
              src="/images/instagram.png"
              alt="Instagram"
              className="h-[52px] w-[52px]"
            />
          </a>
          <span className="text-[16px] font-bold text-[#242424]">
            Cleveland, Ohio
          </span>
        </div>
      </div>
    </footer>
  );
}
