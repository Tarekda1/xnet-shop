import React, { useState } from "react";
import { User } from "../entities/User";
import useAxios from "./useAxios";

// interface User {
//   username: string;
//   password: string;
//   email?: string;
//   name?: string;
//   dateOfBirth?: Date;
// }

const useUserForm = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser);
  const [putUser, putUserState] = useAxios();
  const [addUser, addUserState] = useAxios();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await putUser({
      url: `${process.env.REACT_APP_API_URL}/users/${user._id}`,
      method: "put",
      data: user,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("User data to be submitted:", user);
    return resp;
  };
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await addUser({
      url: `${process.env.REACT_APP_API_URL}/users`,
      method: "post",
      data: user,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log("User data to be submitted:", user);
    return resp;
  };

  const resetForm = () => {
    setUser(initialUser);
  };

  return {
    user,
    handleInputChange,
    resetForm,
    handleUpdate,
    putUserState,
    handleAddUser,
    addUserState,
  };
};

export default useUserForm;
