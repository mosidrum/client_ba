import { Action } from '@components/Action';
import { Articles } from '@components/Articles';
import { Hero } from '@components/Hero';
import { MainLayout } from '@components/MainLayout';
import React, { useState } from 'react';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <MainLayout>
        <Hero onSearch={handleSearch} />
        <Articles searchTerm={searchTerm} />
      </MainLayout>
      <Action />
    </>
  );
};

export default Homepage;
