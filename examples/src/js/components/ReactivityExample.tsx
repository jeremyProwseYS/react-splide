import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { generateSlides } from '../utils';


export const ReactivityExample: React.FC = () => {
  const [gap, setGap] = useState(10);
  const [perPage, setPerPage] = useState(2);
  const [height, setHeight] = useState(10);

  const options = {
    height: `${height}rem`,
    perPage,
    gap,
  }

  return (
    <div className="wrapper">
      <h2 id="reactivity-example-heading">Reactivity Example</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <span>gap:</span>
          <input
            type="number"
            min="0"
            max="20"
            defaultValue="10"
            onChange={e => setGap(+e.target.value || 0)}
          />
          px
        </label>

        <label>
          <span>perPage:</span>
          <input
            type="number"
            min="1"
            max="5"
            defaultValue="2"
            onChange={e => setPerPage(+e.target.value || 2)}
          />
        </label>

        <label>
          <span>height:</span>
          <input
            type="number"
            min="5"
            max="30"
            defaultValue="10"
            onChange={e => setHeight(+e.target.value || 10)}
          />
          rem
        </label>
      </div>

      <Splide
        options={options}
        aria-labelledby="reactivity-example-heading"
      >
        {generateSlides().map(slide => (
          <SplideSlide key={slide.src}>
            {/* <img src={slide.src} alt={slide.alt} /> */}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
