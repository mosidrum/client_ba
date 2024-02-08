import { Articles } from '@components/Articles';
import { Hero } from '@components/Hero';
import React from 'react';

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Articles />
    </div>
  );
};

export default Homepage;
