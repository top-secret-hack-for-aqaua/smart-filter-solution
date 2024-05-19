import cls from './CategoriesPage.module.scss';
import { BorderEnum, ColorEnum, SizeEnum, useDebounce, WeightEnum } from '@shared/lib';
import { Input, Select, Text } from '@shared/ui';
import { useEffect, useState } from 'react';
import { Category, useGetCategoriesBySearch, useToggleCategory } from '@entities/category';
import { useGetChilds } from '@entities/child';

export const CategoriesPage = () => {
    const { data: childs } = useGetChilds();
    const { trigger: toggleTrigger } = useToggleCategory();
    const [child, setChild] = useState<string>('');
    const [search, setSearch] = useState('');
    const debouncedSearchTerm = useDebounce({ value: search, delay: 100 });
    const { trigger: searchTrigger, data } = useGetCategoriesBySearch();
    const handleTabClick = async (value: string) => {
        setChild(value);
        await searchTrigger({
            value: value,
            q: '',
        });
    };
    useEffect(() => {
        searchTrigger({
            value: child,
            q: debouncedSearchTerm,
        });
    }, [debouncedSearchTerm]);
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
                {childs
                    &&
                    <Select items={childs} onSelect={handleTabClick} />
                }
            </div>
            {child &&
                <>
                    <Input
                        search={true}
                        borderColor={ColorEnum.SECONDARY}
                        className={cls.inputSearch}
                        bgColor={ColorEnum.BG}
                        color={ColorEnum.WHITE}
                        border={BorderEnum.H4}
                        label={'Категории'} value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                    <Text.Paragraph
                        color={ColorEnum.SECONDARY}
                        size={SizeEnum.H1}
                        weight={WeightEnum.MEDIUM}
                        className={cls.addNewTitle}
                    >

                        Выберите категории видео, к которым будет запрещен доступ
                    </Text.Paragraph>
                    <ul className={cls.list}>
                        {data && data.map((item) => (
                            <Category
                                key={item.name}
                                onClick={() => {
                                    toggleTrigger({
                                        category_name: item.name,
                                        children_name: child,
                                    });
                                    console.log(412);
                                }}

                                name={item.name} isActive={item.is_allow} />
                        ))}
                    </ul>
                </>
            }

        </div>
    );
};

