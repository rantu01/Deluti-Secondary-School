// app/gallery/page.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiX, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Sample image data (replace with your school’s real gallery photos)
    const imgList = [
      { src: '/photo1.avif', category: 'campus', title: 'School Campus View' },
      { src: '/photo2.jpg', category: 'students', title: 'Classroom Activity' },
      { src: '/photo3.jpg', category: 'events', title: 'Annual Sports Day' },
      { src: '/photo4.jpg', category: 'teachers', title: 'Faculty Group Photo' },
    ];
    setImages(imgList);
  }, []);

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  const categories = ['all', ...new Set(images.map(img => img.category))];

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex(img => img.src === selectedImage.src);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <FiArrowLeft size={18} />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            School Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore memorable moments and achievements of our students, teachers, and school events.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <GalleryItem
              key={idx}
              image={img}
              index={idx}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No images found for this category.</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <FiX size={24} />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              >
                <FiChevronRight size={24} />
              </button>

              {/* Image */}
              <div className="relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="rounded-lg object-contain max-h-[80vh]"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300 capitalize">
                    {selectedImage.category}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual Gallery Item Component
function GalleryItem({ image, index, onClick }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square bg-gray-200">
        {/* ✅ FIXED: added 'priority={true}' and 'unoptimized' to avoid layout bug */}
        <Image
          src={image.src}
          alt={image.title}
          fill
          unoptimized
          priority
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <FiSearch size={32} className="text-white" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
            {image.category}
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {image.title}
        </h3>
      </div>
    </motion.div>
  );
}

