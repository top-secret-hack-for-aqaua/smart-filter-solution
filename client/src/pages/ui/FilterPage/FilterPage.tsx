import cls from './FilterPage.module.scss';
import { ISelectItem, Select, Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import ArrowRight from '@assets/icons/arrowRight.svg';
import { useState } from 'react';
import Category from '@assets/icons/category.svg';
import Time from '@assets/icons/time.svg';
import { Link } from 'react-router-dom';

export const FilterPage = () => {
    const list: ISelectItem[] = [
        {
            label: 'test 1',
            value: 'test 1',
        },
        {
            label: 'test 2',
            value: 'test 2',
        },
        {
            label: 'test 3',
            value: 'test 3',
        },
        {
            label: 'test 4',
            value: 'test 4',
        },
    ];
    const [activeTab, setActiveTab] = useState(list[0].value);
    const handleTabClick = (value: string) => {
        setActiveTab(value);
    };
    return (
        <div className={cls.wrapper}>
            <div className={cls.addNew}>
                <Text.Paragraph
                    color={ColorEnum.SECONDARY}
                    size={SizeEnum.H1}
                    weight={WeightEnum.MEDIUM}
                    className={cls.addNewTitle}>
                    Контролируйте контент, который смотрит ваш ребенок.
                    Для добавления устройства, настройте контроль над ним.
                </Text.Paragraph>
                <ArrowRight />
            </div>
            <Text.Heading
                color={ColorEnum.SECONDARY}
                size={SizeEnum.H5}
                weight={WeightEnum.MEDIUM}
                className={cls.addNewTitle}
            >
                Доступные устройства
            </Text.Heading>
            <Select items={list} onSelect={handleTabClick} />
            <Text.Heading
                color={ColorEnum.SECONDARY}
                size={SizeEnum.H5}
                weight={WeightEnum.MEDIUM}
                className={cls.addNewTitle}
            >
                Настройка контроля
            </Text.Heading>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <div className={cls.listItemInfo}>
                        <Text.Heading
                            color={ColorEnum.SECONDARY}
                            size={SizeEnum.H5}
                            weight={WeightEnum.BOLD}
                        >
                            Экранное время
                        </Text.Heading>
                        <Text.Paragraph
                            color={ColorEnum.SECONDARY}
                            size={SizeEnum.H2}
                            weight={WeightEnum.MEDIUM}
                        >
                            Настройте количество часов, которое ребенок может пользоваться сервисами
                        </Text.Paragraph>
                    </div>
                    <Time />
                </li>
                <li className={cls.listItem}>
                    <Link to="/filter/categories" className={cls.listItemInfo}>
                        <Text.Heading
                            color={ColorEnum.SECONDARY}
                            size={SizeEnum.H5}
                            weight={WeightEnum.BOLD}
                        >
                            Категории
                        </Text.Heading>
                        <Text.Paragraph
                            color={ColorEnum.SECONDARY}
                            size={SizeEnum.H2}
                            weight={WeightEnum.MEDIUM}
                        >
                            Настройте категории видео,
                            к которым у ребенку будет запрещен или разрешен доступ
                        </Text.Paragraph>
                    </Link>
                    <Category />
                </li>
            </ul>
        </div>
    );
};

