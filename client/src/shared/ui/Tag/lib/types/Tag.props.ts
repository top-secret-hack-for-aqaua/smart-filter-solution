import { BorderEnum, ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { DetailedHTMLProps } from 'react';
import { IParagraphProps } from '@shared/ui';


export enum TagTypeEnum {
    FILLED = 'filled',
    DEFAULT = 'default',
    DASHED = 'dashed',
}

export interface ITagProps extends DetailedHTMLProps<IParagraphProps, HTMLParagraphElement> {
    color?: ColorEnum;
    bgColor?: ColorEnum;
    size?: SizeEnum;
    fontFamily?: FontFamilyEnum;
    weight?: WeightEnum;
    border?: BorderEnum;
    tagType?: TagTypeEnum;
}