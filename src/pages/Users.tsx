import React, { FC, useCallback, useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import useUserSearch from "../hooks/useUserSearch";
import { User } from "../entities/User";
import useUsers from "../hooks/useUsers";

const initialUsersList: User[] = [
  {
    _id: "1",
    name: "tare2",
    email: "<EMAIL>",
    username: "admin",
    password: "<PASSWORD>",
  },
];

const AddNewProduct: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { users: remoteUsers, loading } = useUsers();
  const [users, setUsers] = useState<any>(initialUsersList);
  const { searchUsers } = useUserSearch({
    initialUsers: remoteUsers,
    searchTerm,
  });

  useEffect(() => {
    setUsers(remoteUsers);
  }, [remoteUsers]);

  // Handler for searching products
  const handleSearch = useCallback(() => {
    const filtered = searchUsers();
    setUsers(filtered);
  }, [setUsers, searchUsers]);

  const onTextChanged = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      if (e.target.value !== "") setSearchTerm(e.target.value);
      else {
        setSearchTerm("");
        handleSearch();
      }
    },
    [setSearchTerm, handleSearch]
  );

  return (
    <div className="container mx-auto mt-1">
      <div className="border border-gray-300 bg-white rounded flex items-center justify-start gap-4 mt-2 mb-2 p-2 shadow-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search users..."
            className="border border-gray-300 rounded px-2 py-1 mr-2"
            value={searchTerm}
            onChange={onTextChanged}
          />
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            onClick={handleSearch} // Call the search handler
          >
            Search
          </button>
        </div>
      </div>
      <UsersList loading={loading} users={users} />
    </div>
  );
};

export default AddNewProduct;
