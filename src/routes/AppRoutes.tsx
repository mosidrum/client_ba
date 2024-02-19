import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths';
import { LandingPage } from '@pages/Landing';
import { Homepage } from '@pages/Homepage';
import { ArticlesPage, SingleArticle } from '@pages/ArticlesPage';
import { Register } from '@pages/Register';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<LandingPage />}>
        <Route path={paths.homepage} element={<Homepage />} />
        <Route path={paths.articles} element={<ArticlesPage />} />
        <Route path={paths.readArticle} element={<SingleArticle />} />
        <Route path={paths.register} element={<Register />} />
      </Route>
    </Routes>
  );
};
