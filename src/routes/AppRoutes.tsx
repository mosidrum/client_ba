import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths';
import { LandingPage } from '@pages/Landing';
import { Homepage } from '@pages/Homepage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<LandingPage />}>
        <Route path={paths.homepage} element={<Homepage />} />
      </Route>
    </Routes>
  );
};
