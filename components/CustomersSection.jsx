import Carousel from "./Carousel";

export default function CustomersSection() {
  const carouselSlides = [
    "/carousel/1.jfif",
    "/carousel/2.jfif",
    "/carousel/3.jfif",
    "/carousel/4.jfif",
    "/carousel/5.jfif",
    "/carousel/3.png",
  ];

  return (
    <section
      id="customers"
      className="scroll-mt-[90px] relative overflow-hidden py-16 pb-20 max-sm:py-12"
    >
      <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
        {/* Heading */}
        <p className="text-[18px] font-bold uppercase tracking-[0.08em] text-[#242424]">
          Our Customers
        </p>

        <h2 className=" font-display text-[36px] font-extrabold leading-tight max-sm:text-[28px]">
          Built for the way life moves.
        </h2>
      </div>

      {/* Full-width Carousel */}
      <div className="mt-8 w-full px-6 max-sm:px-[18px]">
        <Carousel slides={carouselSlides} alt="Mii Shoppe customer" />
      </div>
    </section>
  );
}
