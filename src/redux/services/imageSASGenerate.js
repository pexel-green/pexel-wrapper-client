import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageSASURIGeneration = createApi({
    reducerPath: 'imageSASURIGeneration',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pexel-media-upload.azurewebsites.net',
    }),
    endpoints: (builder) => ({
        generateSASURI: builder.mutation({
            query: (filename) => ({
                url: '/api/upload/sasurl',
                method: 'POST',
                body: {
                    filename
                }
            }),
        }),
    }),
});


export const { useGenerateSASURIMutation } = imageSASURIGeneration;