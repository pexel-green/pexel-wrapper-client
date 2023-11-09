import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadUsingSASToken = createApi({
    reducerPath: 'uploadThroughSAS',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pexelblobstorage.blob.core.windows.net',
        prepareHeaders: (headers) => {
            headers.set('x-ms-blob-type', 'BlockBlob');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        putToBlobStorage: builder.mutation({
            query: ({ file, SASURI }) => ({
                url: "photos" + SASURI.substring(SASURI.lastIndexOf("/")),
                method: 'PUT',
                body: file,
                headers: {
                    "x-ms-blob-type": "BlockBlob",
                    "x-ms-filename": file.name
                }
            }),
        }),
    }),
});

export const { usePutToBlobStorageMutation } = uploadUsingSASToken;