// app/components/Hero.jsx
'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
];

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="mt-4">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i}>
            <img src={img} alt={`Hero ${i}`} className="w-full h-96 object-cover rounded" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
