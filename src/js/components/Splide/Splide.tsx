// Core
import { Options, Splide as SplideCore } from '@splidejs/splide';
import React, { useEffect, useRef, useState } from 'react';

// Constants
import { EVENTS } from '@/constants/events';

// Helpers
import { classNames, isEqualDeep, isEqualShallow, merge } from '@/utils';

// Components
import { SplideProps } from '@/types';
import { SplideTrack } from '@/components/SplideTrack/SplideTrack';

/**
 * The functional component for the Splide React node.
 *
 * @since 0.5.0
 */
export const Splide: React.FC<SplideProps> = (props) => {
  const { options, extensions, transition, className, tag: Root = 'div', hasTrack = true, children, ...restProps } = props;

  const splideRef = useRef<HTMLDivElement>(null);
  const [splide, setSplide] = useState<SplideCore | undefined>(undefined);
  const [currentOptions, setCurrentOptions] = useState<Options | undefined>(undefined);
  const [slides, setSlides] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const { current } = splideRef;

    if (current) {
      const newSplide = new SplideCore(current, options);
      bind(newSplide);
      newSplide.mount(extensions, transition);

      setSplide(newSplide);
      setCurrentOptions(merge({}, options || {}));
      setSlides(getSlides(newSplide));
    }

    return () => {
      if (splide) {
        splide.destroy();
        setSplide(undefined);
      }

      setCurrentOptions(undefined);
      setSlides([]);
    };
  }, []);

  useEffect(() => {
    if (!splide) {
      return;
    }

    if (options && !isEqualDeep(currentOptions, options)) {
      splide.options = options;
      setCurrentOptions(merge({}, options));
    }

    const newSlides = getSlides(splide);

    if (!isEqualShallow(slides, newSlides)) {
      splide.refresh();
      setSlides(newSlides);
    }
  }, [options, slides, splide]);

  const getSlides = (splideInstance: SplideCore): HTMLElement[] => {
    const children = splideInstance.Components.Elements?.list.children;
    return children ? Array.prototype.slice.call(children) : [];
  };

  const bind = (splideInstance: SplideCore): void => {
    EVENTS.forEach(([event, name]) => {
      const handler = props[name];

      if (typeof handler === 'function') {
        splideInstance.on(event, (...args: any[]) => {
          handler(splideInstance, ...args);
        });
      }
    });
  };

  const omit = <K extends keyof SplideProps>(props: SplideProps, keys: readonly K[]): Omit<SplideProps, K> => {
    const result = { ...props };
    keys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        delete result[key];
      }
    });
    return result;
  };

  return (
    <Root
      className={classNames('splide', className)}
      ref={splideRef}
      {...omit(restProps, ['options', ...EVENTS.map(event => event[1])])}
    >
      {hasTrack ? <SplideTrack>{children}</SplideTrack> : children}
    </Root>
  );
};