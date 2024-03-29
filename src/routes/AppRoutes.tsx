import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { paths } from '@routes/paths';
import { LandingPage } from '@pages/Landing';
import { Homepage } from '@pages/Homepage';
import { ArticlesPage, SingleArticle } from '@pages/ArticlesPage';
import { Register } from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
import { Login } from '@pages/Login';
import { ResetPassword } from '@pages/ResetPassword';
import { Profile } from '@pages/Profile';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Admin, AdminLayout, Comments, ManagePost, NewPost } from '@pages/Admin';
import {AdminRoute} from "@routes/AdminRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={paths.index} element={<LandingPage />}>
        <Route path={paths.homepage} element={<Homepage />} />
        <Route path={paths.articles} element={<ArticlesPage />} />
        <Route path={`${paths.readArticle}/:slug`} element={<SingleArticle />} />
        <Route path={paths.forgotPassword} element={<ForgotPassword />} />
        <Route path={paths.resetPassword} element={<ResetPassword />} />
        <Route path={paths.register} element={<Register />} />
        <Route path={paths.login} element={<Login />} />
        <Route path={paths.index} element={<ProtectedRoutes />}>
          <Route path={paths.profile} element={<Profile />} />
        </Route>
      </Route>
        <Route path={paths.index} element={<AdminRoute />}>
            <Route path={`${paths.admin}/:id`} element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="comments" element={<Comments />} />
                <Route path="newpost" element={<NewPost />} />
                <Route path="managepost" element={<ManagePost />} />
            </Route>
        </Route>

    </Routes>
  );
};
