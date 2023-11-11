import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blobService = createApi({
    reducerPath: 'blob',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://be-core-service.azurewebsites.net/api/blob'
        // baseUrl: 'http://localhost:5002/api/blob'

    }),
    endpoints: (builder) => ({
        addBlobToContaintainer: builder.mutation({
            query: ({ blobName, containerId }) => ({
                url: '/create',
                method: "POST",
                body: {
                    data: {
                        name: blobName.split("/")[1],
                        containerId: containerId
                    }
                }
            }),
        })
    }),
});

export const { useAddBlobToContaintainerMutation } = blobService;