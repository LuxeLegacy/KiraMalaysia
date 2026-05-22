import { useState, useEffect } from 'react';

const images = [
  {
    src: '/ChatGPT_Image_Mar_20,_2026,_11_26_10_AM.png',
    alt: 'You Could Be Missing Tax Reliefs - Check your estimate before you file'
  },
  {
    src: '/ChatGPT_Image_Mar_20,_2026,_11_26_13_AM.png',
    alt: 'Tax Deadline is Close - I used a calculator first instead of filing blind'
  },
  {
    src: '/ChatGPT_Image_Mar_20,_2026,_11_26_16_AM copy.png',
    alt: 'Shocked by Your Tax Bill? How much could you have saved with the right reliefs?'
  },
  {
    src: '/ChatGPT_Image_Mar_20,_2026,_11_26_19_AM copy.png',
    alt: 'One Hub, Many Calculators - EPF, Income Tax, Car Loan, and Mortgage'
  },
  {
    src: '/ChatGPT_Image_Mar_20,_2026,_11_26_22_AM copy.png',
    alt: 'Stop Guessing Before You Submit - Calculate exact tax to avoid penalties'
  }
];

export default function HeroImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 12000);
  };

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl mb-4 bg-gray-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative aspect-square">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
              index === activeIndex
                ? 'ring-4 ring-green-500 scale-105 shadow-lg'
                : 'ring-2 ring-gray-300 hover:ring-gray-400 hover:scale-105 opacity-70 hover:opacity-100'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <div className="aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-green-500'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
