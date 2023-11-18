import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://be-core-service.azurewebsites.net/api/auth'
        baseUrl: 'http://localhost:5002/api/auth'

    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: "POST",
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: "POST",
                body: data
            }),
        }),
        verifyToken: builder.mutation({
            query: (token) => ({
                url: '/verify',
                method: "POST",
                body: { token }
            })
        }),
        activateAccount: builder.mutation({
            query: (token) => ({
                url: '/activate',
                method: "POST",
                body: { token }
            })
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useActivateAccountMutation, useVerifyTokenMutation, endpoints } = authService;