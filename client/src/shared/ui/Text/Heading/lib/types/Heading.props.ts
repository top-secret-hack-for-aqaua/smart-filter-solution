import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';

export interface IHeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    color?: ColorEnum;
    size?: SizeEnum;
    weight?: WeightEnum;
    fontFamily?: FontFamilyEnum;
}