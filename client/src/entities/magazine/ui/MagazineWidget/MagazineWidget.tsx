import cls from './MagazineWidget.module.scss';
import Pc from '@assets/icons/pc.svg';
import { Text } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const MagazineWidget = () => {
    const list = [
        {
            time: '20:30',
            title: '[Тринадцать огней] #1 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
        {
            time: '20:30',
            title: '[Тринадцать огней] #2 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
        {
            time: '20:30',
            title: '[Тринадцать огней] #3 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
        {
            time: '20:30',
            title: '[Тринадцать огней] #4 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
        {
            time: '20:30',
            title: '[Тринадцать огней] #5 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
        {
            time: '20:30',
            title: '[Тринадцать огней] #6 НОВОЕ НАЧАЛО',
            author: 'Lololoshka',
        },
    ];
    return (
        <div className={cls.wrapper}>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li className={cls.listItem} key={item.title}>
                        <Pc />
                        <div className={cls.info}>
                            <Text.Heading
                                size={SizeEnum.H6}
                                color={ColorEnum.PRIMARY}
                            >
                                {item.title}
                            </Text.Heading>
                            <Text.Paragraph
                                size={SizeEnum.H1}
                                color={ColorEnum.SECONDARY}
                            >
                                {item.author}
                            </Text.Paragraph>
                        </div>
                        <Text.Paragraph
                            size={SizeEnum.H1}
                            color={ColorEnum.SECONDARY}
                        >
                            {item.time}
                        </Text.Paragraph>
                    </li>
                ))}
            </ul>
        </div>
    );
};

