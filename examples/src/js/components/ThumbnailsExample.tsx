import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Options } from '@splidejs/splide';
import React, { ReactNode, useEffect, useRef } from 'react';
import { generateSlides } from '../utils';

export const ThumbnailsExample: React.FC = () => {

  const mainRef = useRef<Splide>(null);
  const thumbsRef = useRef<Splide>(null);

  /**
   * Set the sync target right after the component is mounted.
   */
  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  /**
   * Render slides.
   *
   * @return Slide nodes.
   */
  const renderSlides = (): ReactNode[] => {
    return generateSlides().map(slide => (
      <SplideSlide key={slide.src}>
        <img src={slide.src} alt={slide.alt} />
      </SplideSlide>
    ));
  };

  const mainOptions: Options = {
    type: 'loop',
    perPage: 2,
    perMove: 1,
    gap: '1rem',
    pagination: false,
    height: '10rem',
  };

  const thumbsOptions: Options = {
    type: 'slide',
    rewind: true,
    gap: '1rem',
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 70,
    cover: true,
    focus: 'center',
    isNavigation: true,
  };

  return (
    <div className="wrapper">
      <h2 id="thumbnail-slider-example">Thumbnail Slider</h2>

      <Splide
        options={mainOptions}
        ref={mainRef}
        aria-labelledby="thumbnail-slider-example"
      >
        {renderSlides()}
      </Splide>

      <Splide
        options={thumbsOptions}
        ref={thumbsRef}
        aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
      >
        {renderSlides()}
      </Splide>
    </div>
  );
};