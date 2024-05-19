import { mainApi } from '@shared/lib/store/api';
import { ISelectItem } from '@shared/ui';

export const childApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllChilds: build.query<ISelectItem[], null>({
            query: () => ({
                url: `/auth/get_childrens_by_user`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetAllChildsQuery } = childApi;