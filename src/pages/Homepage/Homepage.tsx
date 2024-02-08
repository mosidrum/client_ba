import { Action } from '@components/Action';
import { Articles } from '@components/Articles';
import { Hero } from '@components/Hero';
import React from 'react';

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Articles />
      <Action />
    </div>
  );
};

export default Homepage;
