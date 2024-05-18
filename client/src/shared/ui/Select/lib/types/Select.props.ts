export interface ISelectItem {
    label: string;
    value: string;

}

export interface ISelectProps {
    items: ISelectItem[];
    onSelect: (value: string) => void;
}