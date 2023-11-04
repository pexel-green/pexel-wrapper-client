import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageSASURIGeneration = createApi({
    reducerPath: 'imageSASURIGeneration',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pexel-media-upload.azurewebsites.net/api/upload/sasurl',
    }),
    endpoints: (builder) => ({
        generateSASURI: builder.mutation({
            query: (file) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: createFormData(file)
            }),
        }),
    }),
});

// Helper function to create form data
function createFormData(file) {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
}

export const { useGenerateSASURIMutation } = imageSASURIGeneration;