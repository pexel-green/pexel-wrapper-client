import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BE_CORE

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