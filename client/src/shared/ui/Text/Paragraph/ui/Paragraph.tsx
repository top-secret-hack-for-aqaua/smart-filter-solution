import cls from './Paragraph.module.scss';
import { IParagraphProps } from '@shared/ui/Text';
import { classNames, ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const Paragraph = (
    {
        color = ColorEnum.BLACK,
        size = SizeEnum.H1,
        weight = WeightEnum.NORMAL,
        fontFamily = FontFamilyEnum.FIRST,
        className,
        children,
        ...props
    }: IParagraphProps) => {
    return (
        <p
            {...props}
            className={classNames(cls.paragraph, {
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

                // ШРИФТ
                [cls.fontFirst]: fontFamily === FontFamilyEnum.FIRST,
                [cls.fontSecond]: fontFamily === FontFamilyEnum.SECOND,
                [cls.fontThird]: fontFamily === FontFamilyEnum.THIRD,


            }, [className])}
        >
            {children}
        </p>
    );
};

