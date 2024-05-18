import cls from './CategoriesPage.module.scss';
import { BorderEnum, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { Input, ISelectItem, Select, Text } from '@shared/ui';
import { useState } from 'react';

export const CategoriesPage = () => {
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
    const [search, setSearch] = useState('');
    const handleTabClick = (value: string) => {
        setActiveTab(value);
    };
    return (
        <div className={cls.wrapper}>
            <Text.Heading
                className={cls.title}
                size={SizeEnum.H4}
                weight={WeightEnum.MEDIUM}
                color={ColorEnum.TEXT}
            >
                Категории
            </Text.Heading>
            <div className={cls.select}>
                <Text.Heading
                    color={ColorEnum.SECONDARY}
                    size={SizeEnum.H5}
                    weight={WeightEnum.MEDIUM}
                    className={cls.addNewTitle}
                >
                    Доступные устройства
                </Text.Heading>
                <Select items={list} onSelect={handleTabClick} />
            </div>
            <Input
                search={true}
                borderColor={ColorEnum.SECONDARY}
                className={cls.inputSearch}
                bgColor={ColorEnum.BG}
                color={ColorEnum.WHITE}
                border={BorderEnum.H4}
                label={'Категории'} value={search} onChange={(event) => {
                setSearch(event.target.value);
            }} />
            <Text.Paragraph
                color={ColorEnum.SECONDARY}
                size={SizeEnum.H1}
                weight={WeightEnum.MEDIUM}
                className={cls.addNewTitle}
            >

                Выберите категории видео, к которым будет запрещен доступ
            </Text.Paragraph>
        </div>
    );
};

