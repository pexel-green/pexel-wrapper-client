import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base64EncodeURI } from '../../routes/register';

export const blobService = createApi({
    reducerPath: 'blob',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://be-core-service.azurewebsites.net/api'
        // baseUrl: 'http://localhost:5002/api'
    }),
    endpoints: (builder) => ({
        addBlobToContaintainer: builder.mutation({
            query: ({ blobName, containerId }) => ({
                url: '/blob/create',
                method: "POST",
                body: {
                    data: {
                        name: blobName.split("/")[1],
                        containerId: containerId
                    }
                }
            }),
        }),
        getUserByContainer: builder.query({
            query: (container) => ({ url: `/container/find?name=${container}` }),
        }),
        getBlobsByUser: builder.mutation({
            query: (userId) => ({
                url: '/blob',
                method: "POST",
                body: {
                    "where": {
                        "Container": {
                            userId
                        }
                    }
                }
            }),
        }),
        deleteBlob: builder.mutation({
            query: ({ id, imagePath }) => ({
                url: `/blob/delete?documentId=${base64EncodeURI(imagePath)}`,
                method: "DELETE",
                body: {
                    "where": {
                        id
                    }
                }
            }),
        }),
    }),
});

export const { useAddBlobToContaintainerMutation, useGetUserByContainerQuery, useGetBlobsByUserMutation, useDeleteBlobMutation } = blobService;