import { createBrowserRouter, redirect } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage } from '@pages/ui';

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <MainPage />,
            },

            {
                path: 'auth',
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
        ],
    },

]);