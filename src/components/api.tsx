import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApiResponse } from "./apiTypes";
import axios from "axios";

const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    fetchMuseumObjects: builder.query<number[], string>({
      query: (keyword) => `search?q=${keyword}`,
    }),
    fetchMuseumInfo: builder.query<IApiResponse, number>({
      query: (id) => `objects/${id}`,
    }),
  }),
});
export const fetchMuseumObjects = async (
  keyword: string
): Promise<number[]> => {
  try {
    const response = await axios.get<IApiResponse>(
      `${API_BASE_URL}/search?q=${keyword}`
    );

    // Проверка статуса ответа и обработка ошибки, если статус не 200
    if (response.status !== 200) {
      throw new Error("Failed to fetch museum objects");
    }

    const objectIDs: number[] = response.data.objectIDs;
    return objectIDs;
  } catch (error) {
    throw new Error("Failed to fetch museum objects");
  }
};

export const fetchMuseumInfo = async (id: number): Promise<IApiResponse> => {
  try {
    const response = await axios.get<IApiResponse>(
      `${API_BASE_URL}/objects/${id}`
    );

    // Проверка статуса ответа и обработка ошибки, если статус не 200
    if (response.status !== 200) {
      throw new Error("Failed to fetch museum info");
    }

    const museumInfo: IApiResponse = response.data;
    return museumInfo;
  } catch (error) {
    throw new Error("Failed to fetch museum info");
  }
};
export const { useFetchMuseumObjectsQuery, useFetchMuseumInfoQuery } = api;
