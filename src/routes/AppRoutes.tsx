import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths';
import { HomePage, LandingPage } from '@pages/Landing';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<LandingPage />}>
        <Route path={paths.homepage} element={<HomePage />} />
      </Route>
    </Routes>
  );
};
