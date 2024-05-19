import cls from './Tab.module.scss';
import { ITabProps, Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';


export const Tab = (
    {
        text,
        isActive,
        ...props
    }: ITabProps,
) => {
    return (
        <li
            {...props}
            className={classNames(cls.wrapper,
                {
                    [cls.active]: isActive,
                }, [])}>
            <Text.Paragraph
                color={ColorEnum.TEXT}
                size={SizeEnum.H1}
            >
                {text}
            </Text.Paragraph>
        </li>
    );
};

