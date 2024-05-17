import cls from './Tag.module.scss';
import { ITagProps, TagTypeEnum } from '@shared/ui/Tag';
import { Text } from '@shared/ui';
import { BorderEnum, classNames, ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';

export const Tag = (
    {
        color = ColorEnum.BLACK,
        size = SizeEnum.H1,
        fontFamily = FontFamilyEnum.FIRST,
        weight = WeightEnum.NORMAL,
        border = BorderEnum.H3,
        bgColor = ColorEnum.PRIMARY,
        children,
        className,
        tagType,
        ...props
    }: ITagProps) => {
    return (
        <Text.Paragraph
            {...props}
            className={classNames(cls.tag, {
                // ЦВЕТА
                [cls.primaryBg]: bgColor === ColorEnum.PRIMARY,
                [cls.secondaryBg]: bgColor === ColorEnum.SECONDARY,
                [cls.successBg]: bgColor === ColorEnum.SUCCESS,
                [cls.warningBg]: bgColor === ColorEnum.WARNING,
                [cls.dangerBg]: bgColor === ColorEnum.DANGER,
                [cls.infoBg]: bgColor === ColorEnum.INFO,
                [cls.linkBg]: bgColor === ColorEnum.LINK,
                [cls.whiteBg]: bgColor === ColorEnum.WHITE,
                [cls.blackBg]: bgColor === ColorEnum.BLACK,
                // РАЗМЕР
                [cls.h1]: size === SizeEnum.H1,
                [cls.h2]: size === SizeEnum.H2,
                [cls.h3]: size === SizeEnum.H3,
                [cls.h4]: size === SizeEnum.H4,
                [cls.h5]: size === SizeEnum.H5,
                [cls.h6]: size === SizeEnum.H6,

                // BORDER
                [cls.borderH1]: border === BorderEnum.H1,
                [cls.borderH2]: border === BorderEnum.H2,
                [cls.borderH3]: border === BorderEnum.H3,
                [cls.borderH4]: border === BorderEnum.H4,
                [cls.borderH5]: border === BorderEnum.H5,
                [cls.borderH6]: border === BorderEnum.H6,


                [cls.default]: tagType === TagTypeEnum.DEFAULT,
                [cls.dashed]: tagType === TagTypeEnum.DASHED,
                [cls.filled]: tagType === TagTypeEnum.FILLED,

            }, [className])}
            color={color}
            size={size}
            fontFamily={fontFamily}
            weight={weight}
        >
            {children}
        </Text.Paragraph>
    );
};

