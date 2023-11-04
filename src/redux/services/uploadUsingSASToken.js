import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const uploadUsingSASToken = createApi({
    reducerPath: 'uploadThroughSAS',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pexel-media-upload.azurewebsites.net/api/upload/sasurl',
        prepareHeaders: (headers) => {
            headers.set('x-ms-blob-type', 'BlockBlob');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        uploadMediaUsingSASToken: builder.mutation({
            query: (filename) => ({
                url: '/',
                method: 'PUT',
                body: { filename },
            }),
        }),
    }),
});

export const { useUploadMediaUsingSASTokenMutation } = uploadUsingSASToken;