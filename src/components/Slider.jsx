import React, { useEffect, useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1556909114-9f02f8f4a5b4',
  'https://images.unsplash.com/photo-1618354691457-012c9b6ec86f',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  'https://images.unsplash.com/photo-1520975922203-8d107f7483c4',
];

const RotatingCarousel = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const totalWidth = slider.scrollWidth / 2; // Because we duplicate images

    const animate = () => {
      scrollPosition.current += 0.5; // Speed of scroll (adjustable)

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
      className="overflow-hidden w-full max-w-4xl mx-auto"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={sliderRef} className="flex gap-4 pt-5 pb-7">
        {[...images, ...images].map((img, i) => (
          <img
            key={i}
            src={`${img}?auto=format&fit=crop&w=400&q=80`}
            className="w-2/3 min-w-[33.33%] h-60 object-cover rounded-lg shadow-md"
            alt={`slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCarousel;
