import { ReactNode } from 'react';
import { classNames, useTheme } from '@shared/lib';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetMe } from '@entities/user';


export const App = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    useGetMe();
    return <div className={classNames('app', {}, [theme])}>
        <>
            <ToastContainer
                style={{ zIndex: 10000000 }}
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
            {children}
        </>
    </div>;
};