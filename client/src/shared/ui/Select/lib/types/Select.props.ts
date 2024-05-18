export interface ISelectItem {
    name: string;
    id: string;

}

export interface ISelectProps {
    items: ISelectItem[];
    onSelect: (value: string) => void;
}