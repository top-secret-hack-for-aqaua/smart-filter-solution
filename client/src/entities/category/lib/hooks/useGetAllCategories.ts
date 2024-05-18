import { useLazyGetCategoriesQuery } from '@entities/category';

export const useGetAllCategories = () => {
    const [categoryTrigger, { data }] = useLazyGetCategoriesQuery();
    const trigger = async (value: string) => {
        await categoryTrigger(value);
    };
    return {
        trigger, data,
    };
};