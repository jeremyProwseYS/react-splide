import React from 'react';
import { createRoot } from 'react-dom/client';
import { BasicExample } from './components/BasicExample';
import { AutoplayExample } from './components/AutoplayExample';
import { DynamicSlidesExample } from './components/DynamicSlidesExample';
import { ReactivityExample } from './components/ReactivityExample';
import { ThumbnailsExample } from './components/ThumbnailsExample';
import '@splidejs/react-splide/css';
import '../css/style.css';

/**
 * The test application.
 */
const App: React.FC = () => {
  return (
    <div className="examples">
      <BasicExample />
      <AutoplayExample />
      <ReactivityExample />
      <DynamicSlidesExample />
      <ThumbnailsExample />
    </div>
  );
};

const domNode = document.getElementById('app');

if (domNode === null) {
  console.error('The app element is not found.');
} else {
  const root = createRoot(domNode);
  root.render(<App />);
}
