import React from 'react';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import AboutPage from '../pages/AboutPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage></HomePage>
    },
    {
        path: '/about',
        exact: false,
        main: () => <AboutPage></AboutPage>
    },
    {
        path: '/login',
        exact: false,
        main: () => <AuthPage auth="login"></AuthPage>
    },
    {
        path: '/register',
        exact: false,
        main: () => <AuthPage auth="register"></AuthPage>
    },
    {
        path: '/dashboard',
        exact: false,
        main: () => <DashboardPage></DashboardPage>
    }
]

export default routes;