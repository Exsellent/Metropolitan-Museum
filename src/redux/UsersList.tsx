import React from "react";
import { useGetUsersQuery } from "./RTKapi"; // Import the useGetUsersQuery function

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersQuery();

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
        {data?.results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
