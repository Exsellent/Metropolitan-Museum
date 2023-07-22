import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

interface IUser {
  id: number;
  name: string;
}

interface IUsersResponse {
  results: IUser[];
}

const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://collectionapi.metmuseum.org/public/collection/v1",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUsersResponse, void>({
      query: () => "/users",
      transformResponse: (response: { users: IUser[] }) => {
        return { results: response.users };
      },
    }),
  }),
});
export type { FetchBaseQueryError };
export const { useGetUsersQuery } = usersApi;
export default usersApi;
