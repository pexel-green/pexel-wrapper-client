import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const imageValidationApi = createApi({
    reducerPath: 'imageValidation',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://computer-vison-pexel.cognitiveservices.azure.com',
        prepareHeaders: (headers) => {
            headers.set('Ocp-Apim-Subscription-Key', 'cbe62cb6034845338e15459379fad7f7');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        validateImageAdult: builder.mutation({
            query: (file) => ({
                url: '/vision/v3.2/analyze?visualFeatures=Adult',
                method: 'POST',
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