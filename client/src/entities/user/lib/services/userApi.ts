import { mainApi } from '@shared/lib/store/api';

export const userApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query({
            query: () => ({
                url: `/auth/me`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useGetMeQuery } = userApi;