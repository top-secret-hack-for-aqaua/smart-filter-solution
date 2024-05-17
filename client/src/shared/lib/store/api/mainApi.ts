import { createApi, BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '@shared/lib';
import { logout, setToken } from '@features/auth';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // const accessToken = localStorage.getItem("accessToken");
        const accessToken = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set('Authorization', `${accessToken}`);
        }
        return headers;
    },

});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);

        if (refreshResult?.data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const token = refreshResult.data.accessToken;
            localStorage.setItem('accessToken', token);
            api.dispatch(setToken(token));
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('accessToken');
            api.dispatch(logout());
        }
    }
    return result;
};

export const mainApi = createApi({
    baseQuery: baseQueryWithReauth,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (_) => ({}),
    tagTypes: ['User'],
});