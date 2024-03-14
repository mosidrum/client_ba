import { Action } from '@components/Action';
import { Articles } from '@components/Articles';
import { Hero } from '@components/Hero';
import { MainLayout } from '@components/MainLayout';
import React, { useState } from 'react';

const Homepage = () => {

  return (
    <>
      <MainLayout>
        <Hero />
        <Articles />
      </MainLayout>
      <Action />
    </>
  );
};

export default Homepage;
