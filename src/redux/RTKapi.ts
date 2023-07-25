import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the interface for the API response
interface IApiResponse {
  objectIDs: number[];
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

// Create a base query using fetch
const baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
const baseQuery = fetchBaseQuery({ baseUrl });

// Create an instance of RTK-Query API
export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    fetchMuseumObjects: builder.query<number[], string>({
      query: (keyword) => `search?q=${keyword}`,
      transformResponse: (response: IApiResponse) => response.objectIDs,
    }),
    fetchMuseumInfo: builder.query<IApiResponse, number>({
      query: (id) => `objects/${id}`,
      transformResponse: (response: IApiResponse) => response,
    }),
  }),
});

// Export hooks generated by RTK-Query
export const { useFetchMuseumObjectsQuery, useFetchMuseumInfoQuery } = api;
