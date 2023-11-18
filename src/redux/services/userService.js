import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://be-core-service.azurewebsites.net/api/user'

    }),
    endpoints: (builder) => ({
        findUserInfo: builder.query({
            query: (id) => ({ url: `/find?id=${id}` }),
        })
    }),
});

export const { useFindUserInfoQuery } = userService;