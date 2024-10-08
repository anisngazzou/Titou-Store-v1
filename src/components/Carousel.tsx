'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {GrNext, GrPrevious} from 'react-icons/gr';
import {categories} from '@/constant/config';

type Card = {
  id: number;
  image: string;
  price: string;
  description: string;
  details: string;
};
const data = categories;
const cards: Array<Card> = [
  {
    id: 1,
    image: `${data[0].colors[0].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 3 valise Shine',
    details: 'Roues démontables Color Brillant'
  },
  {
    id: 2,
    image: `${data[1].colors[1].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 3 valise Mat',
    details: 'Roues démontables  Color Mat Pro'
  },
  {
    id: 3,
    image: `${data[2].colors[2].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 3 valise Multicolor',
    details: 'Roues démontables Multi Color Pro'
  },
  {
    id: 4,
    image: `${data[0].colors[4].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 2 valise',
    details: '28 - 70 mm'
  },
  {
    id: 5,
    image: `${data[1].colors[0].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 2 valise',
    details: '28 - 70 mm'
  },
  {
    id: 6,
    image: `${data[2].colors[3].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 2 valise',
    details: '28 - 70 mm'
  },
  {
    id: 7,
    image: `${data[0].colors[4].images[0]}`,
    price: '199.99',
    description: 'Ensemble de 2 valise',
    details: '28 - 70 mm'
  }
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const visibleCardsCount = 4; // Show 4 cards at a time

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - visibleCardsCount : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === cards.length - visibleCardsCount ? 0 : prev + 1
    );
  };

  const visibleCards = cards.slice(
    currentIndex,
    currentIndex + visibleCardsCount
  );

  const handleInfiniteLoop = (
    cardsToDisplay: Array<Card>,
    totalCards: number
  ) => {
    if (cardsToDisplay.length < visibleCardsCount) {
      return [
        ...cardsToDisplay,
        ...cards.slice(0, visibleCardsCount - cardsToDisplay.length)
      ];
    }
    return cardsToDisplay;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-inverseCustom bg-[#F0E7D5] pb-4">
      <div className="relative flex items-center justify-center ">
        <motion.div
          animate={{opacity: 1, x: 0}}
          className="flex w-full gap-x-10 overflow-hidden px-6 py-10"
          exit={{opacity: 0, x: -100}}
          initial={{opacity: 0, x: 100}}
          transition={{duration: 0.5, ease: 'easeInOut'}}
        >
          {handleInfiniteLoop(visibleCards, cards.length).map((card) => (
            <motion.div
              key={card.id}
              className="w-1/4"
              transition={{type: 'spring', stiffness: 300}}
              whileHover={{scale: 1.05}}
            >
              <div className="rounded-custom-card bg-white p-4 text-left shadow-lg">
                {loading ? (
                  <div className="mx-auto mb-6 mt-2 h-[200px] w-[200px] animate-pulse bg-gray-200" />
                ) : (
                  <Image
                    alt={card.description}
                    className="mx-auto mb-6 mt-2"
                    height={200}
                    loading="lazy" // Lazy loading
                    src={card.image}
                    width={200}
                  />
                )}
                <div className="-mb-1 font-bold text-2xl">{card.price} $</div>
                <div className="mb-2 text-xs text-gray-500">{card.details}</div>
                <div className="text-sm text-gray-500">{card.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Navigation buttons */}
      <div className="absolute -bottom-3 right-4 flex w-full justify-end gap-x-4 p-4 text-white">
        <button
          className="rounded-full bg-[#d3cdbd8e] p-2 hover:bg-[#b2ac9cad]"
          onClick={prevSlide}
        >
          <GrPrevious size={24} />
        </button>
        <button
          className="rounded-full bg-[#d3cdbd8e] p-2 hover:bg-[#b2ac9cad]"
          onClick={nextSlide}
        >
          <GrNext size={24} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
