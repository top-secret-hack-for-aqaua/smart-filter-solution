import { DetailedHTMLProps, LiHTMLAttributes } from 'react';

export interface ITabProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    isActive: boolean;
    text: string;
}