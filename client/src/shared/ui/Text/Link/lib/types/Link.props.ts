import { ColorEnum, FontFamilyEnum, SizeEnum, WeightEnum } from '@shared/lib';
import { LinkProps } from 'react-router-dom';

export interface ILinkProps extends LinkProps {
    color?: ColorEnum;
    size?: SizeEnum;
    weight?: WeightEnum;
    fontFamily?: FontFamilyEnum;
    className?: string;
}