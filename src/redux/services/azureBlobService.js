import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const azureBlobService = createApi({
    reducerPath: 'azureBlobService',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pexelblobstorage.blob.core.windows.net',
        prepareHeaders: (headers) => {
            headers.set('x-ms-blob-type', 'BlockBlob');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        putToBlobStorage: builder.mutation({
            query: ({ file, SASURI, metadata }) => ({
                url: SASURI.substring(SASURI.lastIndexOf("photos")),
                method: 'PUT',
                body: file,
                headers: {
                    "x-ms-meta-filename": file.name,
                    "x-ms-meta-title": metadata.title,
                    "x-ms-meta-tags": metadata.tags,
                    "x-ms-meta-location": metadata.location,
                }
            }),
        }),
        getBlobMetaData: builder.query({
            query: (filePath) => ({ url: `/${filePath}?comp=metadata` }),
            transformResponse: (_, { response: { headers } }) => {
                const data = extractMetaData(headers)
                return data;
            }
        })
    }),
});


const extractMetaData = (headers) => {
    return {
        filename: headers.get("x-ms-meta-filename"),
        title: headers.get("x-ms-meta-title"),
        tags: headers.get("x-ms-meta-tags"),
        location: headers.get("x-ms-meta-location")
    }
}
export const { usePutToBlobStorageMutation, useGetBlobMetaDataQuery } = azureBlobService;