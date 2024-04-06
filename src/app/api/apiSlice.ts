import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL
})

const TrackingCoinTag = 'TrackingCoin'
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: [TrackingCoinTag],
    endpoints: builder => ({
        getTrackingCoins: builder.query({
            query: ({status}) => `/tracking-coin?status=${status}`,
            transformResponse: response => (response as any)?.data,
            providesTags:  (result) =>
            result
              ? [
                  ...result.map(({ id }: any) => ({ type: TrackingCoinTag, id })),
                  { type: TrackingCoinTag, id: 'LIST' },
                ]
              : [{ type: TrackingCoinTag, id: 'LIST' }],
        }),
        getExchangeInfo: builder.query({
            query: () => '/exchangeInfo',
            transformResponse: response => (response as any)?.data,
        }),
        createTrackingCoin: builder.mutation({
            query: (data) => ({
                url: `/tracking-coin`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: [TrackingCoinTag]
        }),
        updateTrackingCoin: builder.mutation({
            query: ({id, ...data}) => ({
                url: `/tracking-coin/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: [TrackingCoinTag]
        }),
        deleteTrackingCoin: builder.mutation({
            query: (id) => ({
                url: `/tracking-coin/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [TrackingCoinTag]
        })
    })
})

export const {
    useGetTrackingCoinsQuery,
    useGetExchangeInfoQuery,
    useCreateTrackingCoinMutation,
    useUpdateTrackingCoinMutation,
    useDeleteTrackingCoinMutation
} = apiSlice;