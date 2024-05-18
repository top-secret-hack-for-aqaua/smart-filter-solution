import cls from './NewUserPage.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

export const NewUserPage = () => {
    const [time, setTime] = useState(30);
    useEffect(() => {
        const time = setInterval(() => {
            setTime(time - 1);
        });
        if (time < 1) {
            clearInterval(time);
        }
    }, []);
    return (
        <div className={cls.wrapper}>
            <div className={cls.info}>
                <Text.Heading
                    className={cls.title}
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H2}
                >
                    Добавить члена семьи
                </Text.Heading>
                <Text.Paragraph
                    className={cls.text}
                    color={ColorEnum.TEXT}
                    size={SizeEnum.H4}
                >
                    {time}
                </Text.Paragraph>
            </div>
            <QRCode value={'https://google.com'} />
        </div>
    );
};

