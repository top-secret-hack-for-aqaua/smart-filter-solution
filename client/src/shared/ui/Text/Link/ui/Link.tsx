import { Link as RouterLink } from 'react-router-dom';
import cls from './Link.module.scss';
import { classNames, ColorEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { ILinkProps } from '@shared/ui';


export const Link = ({
                         color = ColorEnum.LINK,
                         size = SizeEnum.H1,
                         weight = WeightEnum.NORMAL,
                         className,
                         children,
                         ...props
                     }: ILinkProps) => {
    return (
        <RouterLink
            {...props}
            className={classNames(cls.link, {
                // ЦВЕТА
                [cls.primary]: color === ColorEnum.PRIMARY,
                [cls.secondary]: color === ColorEnum.SECONDARY,
                [cls.success]: color === ColorEnum.SUCCESS,
                [cls.warning]: color === ColorEnum.WARNING,
                [cls.danger]: color === ColorEnum.DANGER,
                [cls.info]: color === ColorEnum.INFO,
                [cls.link]: color === ColorEnum.LINK,
                [cls.white]: color === ColorEnum.WHITE,
                [cls.black]: color === ColorEnum.BLACK,

                // РАЗМЕРЫ
                [cls.h1]: size === SizeEnum.H1,
                [cls.h2]: size === SizeEnum.H2,
                [cls.h3]: size === SizeEnum.H3,
                [cls.h4]: size === SizeEnum.H4,
                [cls.h5]: size === SizeEnum.H5,
                [cls.h6]: size === SizeEnum.H6,

                // ВЕС
                [cls.fontBlack]: weight === WeightEnum.BLACK,
                [cls.fontBold]: weight === WeightEnum.BOLD,
                [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                [cls.fontNormal]: weight === WeightEnum.NORMAL,
                [cls.fontLight]: weight === WeightEnum.LIGHT,
                [cls.fontThin]: weight === WeightEnum.THIN,
            }, [className])}
        >
            {children}
        </RouterLink>
    );
};

