// ///////////////////////////////////////////////////////////////
// 
// This is a work in progress and not yet functional.
// While base functionality is working, the Splide instance
// is not being passed to the ref correctly.
// 
// ///////////////////////////////////////////////////////////////

// Core
import { Options, Splide as SplideCore } from '@splidejs/splide';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

// Constants
import { EVENTS } from '../../constants/events';

// Helpers
import { classNames, isEqualDeep, isEqualShallow, merge } from '../../utils';

// Components
import { SplideProps } from '../../types';
import SplideTrack from '../SplideTrack/SplideTrack';

/**
 * The functional component for the Splide React node.
 *
 * @since 0.5.0
 */

const Splide: React.FC<SplideProps> = (props) => {
  const { options, extensions, transition, className, tag: Root = 'div', hasTrack = true, children, ref, ...restProps } = props;

  const splideRef = useRef<HTMLDivElement>(null);
  const [splide, setSplide] = useState<SplideCore | null>(null);
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
        splide?.destroy();
        setSplide(null);
      }

      setCurrentOptions(undefined);
      setSlides([]);
    };
  }, []);

  useEffect(() => {
    if (!splide) return;

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

  const sync = (_splide: SplideCore): void => {
    splide?.sync(_splide);
  }

  const go = (control: number | string): void => {
    console.log('go', control, splide)
    splide?.go(control);
  }

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

  useImperativeHandle(ref, () => ({
    getSlides,
    sync,
    go,
    splide,
  }), []);

  return (
    <Root
      className={classNames('splide', className)}
      ref={splideRef}
      {...omit(restProps, ['options', 'ref', ...EVENTS.map(event => event[1])])}
    >
      {hasTrack ? <SplideTrack>{children}</SplideTrack> : children}
    </Root>
  );
};

export default Splide;