"use client";

import { useState, useEffect } from "react";

const images = [
  "/photo1.jpg",
  "/photo2.jpg",
  "/photo3.jpg",
  "/photo4.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-96 md:h-[300px] overflow-hidden rounded-2xl shadow-lg">
      <img
        src={images[currentImage]}
        alt="Hero Image"
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
      
    </div>
  );
}
