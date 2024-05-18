import { createBrowserRouter, redirect } from 'react-router-dom';
import { CategoriesPage, FilterPage, LoginPage, MainPage, RegisterPage, UserPage } from '@pages/ui';
import { BottomNavigation } from '@widgets/ui';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BottomNavigation />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'user',
                element: <UserPage />,
            },
            {
                path: 'filter',
                children: [
                    {
                        index: true,
                        element: <FilterPage />,
                    },
                    {
                        path: 'categories',
                        element: <CategoriesPage />,
                    },
                ],
            },
        ],
    },
    {
        path: '/auth',
        children: [
            {
                index: true,
                loader: async () => redirect('/auth/login'),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },

]);