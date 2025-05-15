import React, { useEffect, useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1514995669114-6081e934b693",
  "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368",
  "https://images.unsplash.com/photo-1521334884684-d80222895322",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  "https://images.unsplash.com/photo-1519741491081-5fefb3f69f55",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1542062703-4de6e5e9b2b7",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
  "https://images.unsplash.com/photo-1593032465171-cdf49b01763e",
];

const RotatingCarousel = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2;

    const animate = () => {
      scrollPosition.current += 0.5;
      if (scrollPosition.current >= totalWidth) {
        scrollPosition.current = 0;
      }
      slider.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseEnter = () => cancelAnimationFrame(animationRef.current);
  const handleMouseLeave = () => {
    animationRef.current = requestAnimationFrame(function animate() {
      scrollPosition.current += 0.5;
      const slider = sliderRef.current;
      const totalWidth = slider.scrollWidth / 2;
      if (scrollPosition.current >= totalWidth) {
        scrollPosition.current = 0;
      }
      slider.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    });
  };

  return (
    <div
      className="overflow-hidden w-full max-w-6xl mx-auto"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={sliderRef} className="flex gap-4 pt-5 pb-7">
        {[...images, ...images].map((img, i) => (
          <img
            key={i}
            src={`${img}?auto=format&fit=crop&w=400&q=80`}
            onError={(e) => (e.currentTarget.src = "/fashion1.png")}
            className="w-2/3 min-w-[33.33%] h-60 object-cover rounded-lg shadow-md"
            alt={`slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCarousel;
