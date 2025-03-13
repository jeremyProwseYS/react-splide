import React, { useState, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { generateSlides } from '../utils';

export const DynamicSlidesExample: React.FC = () => {
  const [slides, setSlides] = useState(generateSlides(1));
  const count = useRef(0);

  const onClick = () => {
    const newSlides = slides.concat(generateSlides(1, count.current + 100));
    setSlides(newSlides);
    count.current++;
  };

  return (
    <div className="wrapper">
      <h2 id="dynamic-slides-example-heading">Dynamic Slide Example</h2>

      <Splide
        options={{
          rewind: true,
          perPage: 2,
          height: '10rem',
          gap: '1rem',
        }}
        aria-labelledby="dynamic-slides-example-heading"
      >
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            {/* <img src={slide.src} alt={slide.alt} /> */}
          </SplideSlide>
        ))}
      </Splide>

      <div className="controls">
        <button onClick={onClick}>Add Slide</button>
      </div>
    </div>
  );
};