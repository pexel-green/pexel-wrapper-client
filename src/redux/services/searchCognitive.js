// https://search-cognitive-image.search.windows.net/indexes/cosmosdb-index/docs/search?api-version=2023-07-01-Preview
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const searchImage = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://search-cognitive-image.search.windows.net',
        prepareHeaders: (headers) => {
            headers.set('Api-Key', 'oA1y3D3oBmkAorhpxTM1S7DAyIJOh340CVYn99jzydAzSeBcNU39');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchImage: builder.mutation({
            query: ({ skip, top, search }) => ({
                url: '/indexes/cosmosdb-index/docs/search?api-version=2023-07-01-Preview',
                method: 'POST',
                body: {
                    count: true,
                    skip: skip || 0,
                    top: top || 30,
                    searchMode: "any",
                    queryType: "full",
                    search
                }
            }),
        }),
    }),
});


export const { useSearchImageMutation } = searchImage;