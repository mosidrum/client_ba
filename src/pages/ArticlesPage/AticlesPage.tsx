import { Articles } from '@components/Articles';
import { MainLayout } from '@components/MainLayout';
import React from 'react';

type Props = {};

const AticlesPage = (props: Props) => {
  return (
    <MainLayout>
      <Articles />
    </MainLayout>
  );
};

export default AticlesPage;
