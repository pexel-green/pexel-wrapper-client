import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageValidationApi = createApi({
    reducerPath: 'imageValidation',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://computer-vison-pexel.cognitiveservices.azure.com/vision/v3.2/analyze',
        prepareHeaders: (headers) => {
            headers.set('Ocp-Apim-Subscription-Key', 'YOUR_SUBSCRIPTION_KEY');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        validateImageAdult: builder.mutation({
            query: (file) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: createFormData(file),
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useValidateImageAdultMutation } = imageValidationApi;