import cls from './Collapse.module.scss';
import { ICollapseProps, Text } from '@shared/ui';
import { useState } from 'react';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import ArrowDownIcon from '@assets/icons/arrowDown.svg';

export const Collapse = (
    {
        title,
        children,
        time,
    }: ICollapseProps,
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className={cls.wrapper}>
            <div
                onClick={() => {
                    setIsOpen(prevState => !prevState);
                }}
                className={classNames(cls.info, {
                    [cls.active]: isOpen,
                }, [])}>
                <div className={cls.text}>
                    <Text.Heading
                        size={SizeEnum.H6}
                        weight={WeightEnum.MEDIUM}
                        color={ColorEnum.TEXT}
                    >
                        {title}
                    </Text.Heading>
                    <Text.Paragraph
                        size={SizeEnum.H1}
                        color={ColorEnum.TEXT}
                    >
                        {time}
                    </Text.Paragraph>
                </div>
                <ArrowDownIcon />
            </div>
            <div className={classNames(cls.body, {
                [cls.close]: !isOpen,
            }, [])}>
                {children}
            </div>
        </div>
    );
};

