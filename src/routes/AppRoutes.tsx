import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths';
import { LandingPage } from '@pages/Landing';

type Props = {};

export const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path={paths.index} element={<LandingPage />} />
    </Routes>
  );
};
