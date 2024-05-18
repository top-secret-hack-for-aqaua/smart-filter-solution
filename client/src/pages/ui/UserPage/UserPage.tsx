import cls from './UserPage.module.scss';
import { UserProfile } from '@entities/user';

export const UserPage = () => {
    return (
        <div className={cls.wrapper}>
            <UserProfile />
        </div>
    );
};

