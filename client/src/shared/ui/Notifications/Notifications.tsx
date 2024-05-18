import cls from './Notifications.module.scss';
import NotificationIcon from '@assets/icons/notifications_none.svg';

export const Notifications = () => {
    return (
        <div className={cls.icon}>
            <NotificationIcon />
        </div>
    );
};

