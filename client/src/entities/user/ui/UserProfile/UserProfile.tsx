import cls from './UserProfile.module.scss';
import { Button, Notifications, Text, ThemeSwitcher } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const UserProfile = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.info}>
                <Notifications />
                <Text.Heading
                    size={SizeEnum.H4}
                    weight={WeightEnum.MEDIUM}
                    color={ColorEnum.TEXT}
                >
                    Профиль
                </Text.Heading>
                <ThemeSwitcher />
            </div>
            <div className={cls.avatar}></div>
            <div className={cls.userInfo}>
                <Text.Heading
                    className={cls.title}
                    weight={WeightEnum.MEDIUM}
                    size={SizeEnum.H4}
                >
                    Жмышенко Валерий Альбертович
                </Text.Heading>
                <Button
                    color={ColorEnum.TEXT}
                    bgColor={ColorEnum.DARKBG}
                    weight={WeightEnum.MEDIUM}
                    size={SizeEnum.H1}>
                    РЕДАКТИРОВАТЬ ПРОФИЛЬ
                </Button>
                <div className={cls.additional}>
                    <Button
                        color={ColorEnum.WHITE}
                        bgColor={ColorEnum.PRIMARY}
                        weight={WeightEnum.MEDIUM}
                        size={SizeEnum.H1}>
                        ДОБАВИТЬ УСТРОЙСТВО
                    </Button>
                    <Button
                        color={ColorEnum.WHITE}
                        bgColor={ColorEnum.PRIMARY}
                        weight={WeightEnum.MEDIUM}
                        size={SizeEnum.H1}>
                        СПИСОК ВСЕХ УСТРОЙСТВ
                    </Button>
                </div>
                <Button
                    color={ColorEnum.TEXT}
                    bgColor={ColorEnum.DARKBG}
                    weight={WeightEnum.MEDIUM}
                    size={SizeEnum.H1}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};

