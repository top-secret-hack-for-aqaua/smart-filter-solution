import { useGetAllChildsQuery } from '@entities/child';

export const useGetChilds = () => {
    const { data } = useGetAllChildsQuery(null);
    return {
        data,
    };
};