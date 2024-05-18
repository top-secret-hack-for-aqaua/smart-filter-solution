export interface ICategory {
    name: string;
    description: string;
    is_child_resolved: boolean;
}
export interface ICategoryProps {
    name: string
    isActive: boolean
}