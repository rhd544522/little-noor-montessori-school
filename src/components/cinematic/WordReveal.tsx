import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  highlightClass = 'text-[#9CAF88] italic font-normal',
}) => {
  const shouldReduce = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z]/g, '').toLowerCase()
        );

        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.28em] align-top">
            <motion.span
              initial={{
                opacity: 0,
                y: '100%',
                filter: 'blur(4px)',
              }}
              whileInView={{
                opacity: 1,
                y: '0%',
                filter: 'blur(0px)',
              }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${isHighlight ? highlightClass : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
