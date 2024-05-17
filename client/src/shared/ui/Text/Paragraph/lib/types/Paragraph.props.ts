import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';

export interface IParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    color?: ColorEnum;
    size?: SizeEnum;
    weight?: WeightEnum;
    fontFamily?: FontFamilyEnum;
}