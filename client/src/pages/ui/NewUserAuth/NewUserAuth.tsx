import cls from './NewUserAuth.module.scss';
import { NewUserForm } from '@features/auth';

export const NewUserAuth = () => {
    return (
        <div className={cls.wrapper}>
            <NewUserForm />
        </div>
    );
};

