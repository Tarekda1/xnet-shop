import React, { useCallback } from "react";
import useUserForm from "../../hooks/useUserForm";
import { User } from "../../entities/User";
import { useNavigate } from "react-router-dom";

interface EditProps {
  remoteUser: User;
}

const EditUserForm: React.FC<EditProps> = ({ remoteUser }) => {
  const { user, handleInputChange, handleUpdate } = useUserForm(remoteUser);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        await handleUpdate(e);
        navigate("/users");
      } catch (error) {}
    },
    [handleUpdate, navigate]
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <div className="card rounded-none">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
          <div>
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
          <div>
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
              value={user.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div>
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
          <div className="mt-4 text-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
