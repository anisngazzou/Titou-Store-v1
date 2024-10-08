'use client';
import {motion, useScroll, useTransform} from 'framer-motion';
import React, {useRef} from 'react';

interface ScrollEffectWrapperProps {
  children: React.ReactNode;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  transformRange?: [number, number];
  yRange?: [number, number];
}

const ScrollEffectWrapper: React.FC<ScrollEffectWrapperProps> = ({
  children,
  opacityRange = [1, 0],
  scaleRange = [1, 0.85],
  transformRange = [0, 1],
  yRange = [50, -50]
}) => {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ['end end', 'end start']
  });

  const scale = useTransform(scrollYProgress, transformRange, scaleRange);
  const opacity = useTransform(scrollYProgress, transformRange, opacityRange);
  const y = useTransform(scrollYProgress, transformRange, yRange);

  return (
    <motion.div
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
      style={{
        scale,
        opacity,
        y
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollEffectWrapper;
