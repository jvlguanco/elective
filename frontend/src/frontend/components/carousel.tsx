import React, { useState, useEffect  } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className='w-full'>
      <div className="relative w-full h-billboard overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-md opacity-60"
          style={{ backgroundImage: `url(${images[currentIndex]})`, transform: 'scale(1.1)' }}
        ></div>

        <div className="relative h-full w-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="object-contain h-full"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-16 h-16 bg-center bg-cover cursor-pointer transition-transform duration-300 ${
              index !== currentIndex ? 'opacity-40' : 'opacity-100 border-2 border-red-600'
            }`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;