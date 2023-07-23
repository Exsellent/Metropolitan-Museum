import React from "react";
import { useFetchMuseumObjectsQuery } from "./RTKapi";

const UsersList = () => {
  const { data, error, isLoading } = useFetchMuseumObjectsQuery("art");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("status" in error) {
      // Error from fetchBaseQuery
      return <div>Error: {error.status}</div>;
    } else {
      // Serialized error from the server
      return <div>Error: {error.message}</div>;
    }
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {data?.map((objectId) => (
          <li key={objectId}>{objectId}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
