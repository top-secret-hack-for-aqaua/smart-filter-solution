import cls from './Select.module.scss';
import { useState } from 'react';
import { ISelectItem, ISelectProps, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import ArrowDowm from '@assets/icons/arrowDown.svg';

export const Select = (
    {
        items,
        onSelect,
    }: ISelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const handleItemClick = (item: ISelectItem) => {
        onSelect(item.name);
        setSelectedValue(item.name);
        setIsOpen(false);
    };

    const handleSelectClick = () => {
        setIsOpen(prevState => !prevState);
    };
    return (
        <div className={classNames(cls.wrapper, {
            [cls.active]: isOpen,
        }, [])}>
            <div onClick={handleSelectClick} className={cls.button}>
                <Text.Paragraph
                    size={SizeEnum.H1}
                    color={ColorEnum.WHITE}
                >
                    {selectedValue ? items.find((item) => item.name === selectedValue)?.name :
                        'выберите значение'}
                    <ArrowDowm />
                </Text.Paragraph>
            </div>
            <ul className={classNames(cls.list, { [cls.open]: isOpen }, [])}>
                {items.map((item) => (
                    <li className={cls.listItem} key={item.id} onClick={() => handleItemClick(item)}>
                        <Text.Paragraph
                            size={SizeEnum.H1}
                            color={ColorEnum.WHITE}
                        >{item.name}</Text.Paragraph>
                    </li>
                ))}
            </ul>
        </div>
    );
};