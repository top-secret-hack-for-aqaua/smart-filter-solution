import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface ICategory {
    name: string;
    description: string;
    is_child_resolved: boolean;
    is_allow: boolean
}

export interface ICategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string
    isActive: boolean
}


export interface IInsertCategory {
    children_name: string
    category_name: string
}