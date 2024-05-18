import cls from './FilterPage.module.scss';
import { Select, Text } from '@shared/ui';
import { ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import ArrowRight from '@assets/icons/arrowRight.svg';
import { useState } from 'react';
import Category from '@assets/icons/category.svg';
import Time from '@assets/icons/time.svg';
import { Link } from 'react-router-dom';
import { useGetChilds } from '@entities/child';

export const FilterPage = () => {
    const { data } = useGetChilds();
    const [activeTab, setActiveTab] = useState<string>();
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
            {data &&
                <Select items={data} onSelect={handleTabClick} />
            }
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

