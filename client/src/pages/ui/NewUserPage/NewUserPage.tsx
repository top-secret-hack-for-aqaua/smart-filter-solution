import cls from './NewUserPage.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export const NewUserPage = () => {
    const [time, setTime] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (time < 1) {
            setTime(0);
        }
    }, [time]);

    return (
        <div className={cls.wrapper}>
            <Text.Heading
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Добавить члена семьи
            </Text.Heading>
            <QRCode value={`${import.meta.env.VITE_SERVER_URL}auth/new`} />
            <Text.Heading
                className={cls.text}
                color={ColorEnum.TEXT}
                size={SizeEnum.H2}
            >
                {time}
            </Text.Heading>
        </div>
    );
};
