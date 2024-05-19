import { useLazyGetCategoriesBySearchQuery } from '@entities/category';

export const useGetCategoriesBySearch = () => {
    const [categoryTrigger, { data }] = useLazyGetCategoriesBySearchQuery();
    const trigger = async ({ value, q }: { value: string, q: string }) => {
        await categoryTrigger({ value, q });
    };
    return {
        trigger, data,
    };
};