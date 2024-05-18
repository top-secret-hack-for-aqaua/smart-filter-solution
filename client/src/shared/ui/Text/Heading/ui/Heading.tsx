import cls from './Heading.module.scss';
import { classNames, ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { IHeadingProps } from '@shared/ui/Text';

export const Heading = (
    {
        color = ColorEnum.BLACK,
        size = SizeEnum.H1,
        weight = WeightEnum.NORMAL,
        fontFamily = FontFamilyEnum.FIRST,
        children,
        className,
        ...props
    }: IHeadingProps) => {
    switch (size) {
        case SizeEnum.H1:
            return (
                <h1
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h1]: size === SizeEnum.H1,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h1>
            );
        case SizeEnum.H2:
            return (
                <h2
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h2]: size === SizeEnum.H2,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h2>
            );
        case SizeEnum.H3:
            return (
                <h3
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h3]: size === SizeEnum.H3,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h3>
            );
        case SizeEnum.H4:
            return (
                <h4
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h4]: size === SizeEnum.H4,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h4>
            );
        case SizeEnum.H5:
            return (
                <h5
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h5]: size === SizeEnum.H5,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h5>
            );
        case SizeEnum.H6:
            return (
                <h6
                    {...props}
                    className={classNames(cls.heading, {
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
                        [cls.text]: color === ColorEnum.TEXT,
                        // РАЗМЕРЫ
                        [cls.h6]: size === SizeEnum.H6,

                        // ВЕС
                        [cls.fontBlack]: weight === WeightEnum.BLACK,
                        [cls.fontBold]: weight === WeightEnum.BOLD,
                        [cls.fontMedium]: weight === WeightEnum.MEDIUM,
                        [cls.fontNormal]: weight === WeightEnum.NORMAL,
                        [cls.fontLight]: weight === WeightEnum.LIGHT,
                        [cls.fontThin]: weight === WeightEnum.THIN,

                        // ШРИФТ
                        [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                        [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                        [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,
                    }, [className])}
                >
                    {children}
                </h6>
            );
        default:
            return null;
    }
};

