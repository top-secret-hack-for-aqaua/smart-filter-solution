import cls from './Category.module.scss';
import { ICategoryProps } from '@entities/category';
import { Text } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

export const Category = (
        {
            name,
            isActive,
            ...props
        }:
            ICategoryProps,
    ) => {
        return (
            <div
                {...props}
                className={classNames(cls.wrapper, {
                    [cls.active]: isActive,
                }, [])}>
                <Text.Paragraph
                    className={cls.text}
                    color={ColorEnum.WHITE}
                    size={SizeEnum.H2}
                >
                    {name}
                </Text.Paragraph>
            </div>
        );
    }
;

