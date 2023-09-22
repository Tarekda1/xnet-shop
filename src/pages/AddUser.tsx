import React, { FC } from "react";
import UserAddForm from "../components/UserAddForm/UserAddForm";

const AddUser: FC = () => {
  return (
    <div className="container mx-auto mt-1">
      <UserAddForm />
    </div>
  );
};

export default AddUser;
