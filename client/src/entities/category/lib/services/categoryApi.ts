import { mainApi } from '@shared/lib/store/api';
import { ICategory } from '@entities/category';

export const categoryApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query<ICategory[], string>({
            query: (value: string) => ({
                url: `/video/get_tags?q=${value}&`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useLazyGetCategoriesQuery } = categoryApi;