// app/gallery/page.jsx
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // যদি তুমি public/gallery তে images রাখো
    const imgList = [
      '/photo1.jpg',
      '/photo2.jpg',
      '/photo3.jpg',
      '/photo4.jpg',
    ];
    setImages(imgList);
  }, []);

  return (
    <div className='max-w-6xl  mx-auto'>
      <h2 className="text-2xl font-semibold mb-4 ">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="border p-2 rounded">
            <Image src={img} alt={`Gallery ${idx}`} width={300} height={200} className="rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
