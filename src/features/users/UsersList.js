import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchUsers } from "../../app/api/UsersFn";
import User from "./User";
import useAxiosPrivate from "../../app/hooks/useAxiosPrivate";
import useTitle from "../../app/hooks/useTitle";

const UsersList = () => {
  useTitle('techNotes: Users List')
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(axiosPrivate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // Check if the data has the expected structure
  const users = data?.users || [];

  const tableContent = users.length ? (
    users.map((user) => <User key={user._id} user={user} />)
  ) : (
    <tr>
      <td colSpan="3">No users found</td>
    </tr>
  );

  return (
    <table className="table table--users">
      <thead className="table__thead">
        <tr>
          <th scope="col" className="table__th user__username">
            Username
          </th>
          <th scope="col" className="table__th user__roles">
            Roles
          </th>
          <th scope="col" className="table__th user__edit">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default UsersList;
