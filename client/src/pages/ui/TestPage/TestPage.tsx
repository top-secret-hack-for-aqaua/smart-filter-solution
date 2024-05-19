import React, { useState, useEffect } from 'react';
import cls from './TestPage.module.scss';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import firstImg from '@assets/img/1.png';
import secondImg from '@assets/img/2.png';
import thirdImg from '@assets/img/3.png';
import fourthImg from '@assets/img/4.png';
import fivethImg from '@assets/img/5.png';
import { useSendVideo } from '@entities/video';

export const TestPage = () => {
    const [loaded, setLoaded] = useState(Array(5).fill(false));
    const { trigger, data } = useSendVideo();
    useEffect(() => {
        const timers = loaded.map((_, index) => {
            const randomDelay = Math.random() * (2000 - 500) + 500; // Случайное число от 500 до 2000 мс

            return setTimeout(() => {
                setLoaded(prev => {
                    const newLoaded = [...prev];
                    newLoaded[index] = true;
                    return newLoaded;
                });
            }, randomDelay);
        });

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    const list = [
        {
            name: 'string 1',
            url: 'https://www.youtube.com/watch?v=liNSvgaMjTc',
            img: firstImg,
        },
        {
            name: 'string 2',
            url: 'https://www.youtube.com/watch?v=CHYlH9pPYxU',
            img: secondImg,
        },
        {
            name: 'string 3',
            url: 'https://www.youtube.com/watch?v=d_YNOOUjeHw',
            img: thirdImg,
        },
        {
            name: 'string 5',
            url: 'https://www.youtube.com/watch?v=NlCzS5Y1G4o&list=PLQs3W11UxdHbyuaBD-uSmLsGq5pm-6uPl&index=4',
            img: fivethImg,
        },
        {
            name: 'string 4',
            url: 'https://nuum.ru/clips/2137212-bombicheskuiu-devochku-v-topy-srochno-top-rekomendatsii',
            img: fourthImg,
        },
    ];

    const allLoaded = loaded.every(item => item);

    return (
        <div className={cls.wrapper}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Тестирование
            </Text.Heading>
            {
                !allLoaded
                    ?
                    <Text.Heading
                        size={SizeEnum.H4}
                        weight={WeightEnum.MEDIUM}
                        color={ColorEnum.TEXT}
                    >
                        Загрузка
                    </Text.Heading>
                    :
                    <ul className={cls.list}>
                        {list.map((item) => (
                            <li
                                onClick={() => {
                                    trigger({
                                        name: item.name,
                                        url: item.url,
                                    });
                                }}
                                key={item.name} className={cls.listItem}
                            >
                                <img className={cls.img} src={item.img} alt={item.name} />
                                {data &&
                                    <Text.Paragraph
                                        size={SizeEnum.H1}
                                        weight={WeightEnum.MEDIUM}
                                        color={ColorEnum.TEXT}
                                    >
                                        {data.category}
                                    </Text.Paragraph>
                                }
                            </li>
                        ))}
                    </ul>
            }

        </div>
    );
};
