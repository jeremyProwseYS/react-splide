import React, { JSX } from 'react';
import { classNames } from '../../utils';

/**
 * The component for each slide element.
 *
 * @since 0.5.0
 */
const SplideSlide: React.FC<JSX.IntrinsicElements['li']> = ({ children, className, ...props }) => {
  return (
    <li className={classNames('splide__slide', className)} {...props}>
      {children}
    </li>
  );
};

export default SplideSlide;