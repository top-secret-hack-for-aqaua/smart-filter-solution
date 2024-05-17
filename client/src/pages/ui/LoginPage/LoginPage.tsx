import cls from './LoginPage.module.scss';
import { LoginForm } from '@features/auth';

export const LoginPage = () => {
    return (
        <div className={cls.wrapper}>
            <LoginForm />
        </div>
    );
};

