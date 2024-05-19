import { createBrowserRouter, redirect } from 'react-router-dom';
import {
    CategoriesPage,
    FilterPage,
    LoginPage,
    MainPage,
    NewUserPage,
    RegisterPage,
    StatisticsPage, TimeControlPage,
    UserPage,
} from '@pages/ui';
import { BottomNavigation } from '@widgets/ui';
import { NewUserAuth } from '@pages/ui/NewUserAuth';

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
                path: 'statistics',
                element: <StatisticsPage />,
            },
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: <UserPage />,
                    },
                    {
                        path: 'new',
                        element: <NewUserPage />,
                    },
                ],
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
                    {
                        path: 'time',
                        element: <TimeControlPage />,
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
            {
                path: 'new',
                element: <NewUserAuth />,
            },
        ],
    },

]);