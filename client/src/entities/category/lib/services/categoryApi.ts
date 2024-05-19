import { mainApi } from '@shared/lib/store/api';
import { ICategory, IInsertCategory } from '@entities/category';

export const categoryApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getCategoriesBySearch: build.query<ICategory[], { value: string, q: string }>({
            query: ({ value, q }) => ({
                url: `/video/get_personal_tags/${value}?q=${q}&`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        toggleCategory: build.mutation<unknown, IInsertCategory>({
            query: (value) => ({
                url: `/video/insert_rejections`,
                method: 'POST',
                body: value,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});
export const {
    useLazyGetCategoriesBySearchQuery,
    useToggleCategoryMutation,
} = categoryApi;