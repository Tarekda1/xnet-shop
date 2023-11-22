import React, { useCallback } from "react";
import useUserForm from "../../hooks/useUserForm";
import { User } from "../../entities/User";
import { useNavigate } from "react-router-dom";

const UserAddForm: React.FC = () => {
  const initialUser: User = {
    _id: "",
    name: "",
    email: "",
    password: "",
  };
  const { user, handleInputChange, handleAddUser } = useUserForm(initialUser);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: any) => {
      handleAddUser(e);
    },
    [handleAddUser]
  );

  const cancelCb = useCallback(() => {
    navigate("/users");
  }, [navigate]);

  return (
    <div className="p-4">
      <div className="card rounded-none">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.password}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="flex flex-1 flex-col">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
          </div>

          <div className="mt-4 text-end">
            <button
              onClick={cancelCb}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <i className="fa fa-plus"></i> Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddForm;
