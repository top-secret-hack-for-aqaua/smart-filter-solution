import cls from './RegisterPage.module.scss';
import { RegisterForm } from '@features/auth';

export const RegisterPage = () => {
    return (
        <div className={cls.wrapper}>
            <RegisterForm />
        </div>
    );
};

