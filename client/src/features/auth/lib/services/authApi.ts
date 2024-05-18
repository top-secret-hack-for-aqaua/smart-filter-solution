import { mainApi } from '@shared/lib/store/api';
import { ILoginRequest, INewUserRequest, IRegisterRequest } from '@features/auth';

export const authApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<any, ILoginRequest>({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: build.mutation<any, IRegisterRequest>({
            query: (data) => ({
                url: `/auth/register`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: build.query({
            query: () => ({
                url: `/auth/logout`,
                method: 'GET',
            }),
        }),
        newUser: build.mutation<any, INewUserRequest>({
            query: (data) => ({
                url: `/auth/create_children`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
export const {
    useLoginMutation,
    useRegisterMutation,
    useLazyLogoutQuery,
    useNewUserMutation,
    useLogoutQuery,
} = authApi;