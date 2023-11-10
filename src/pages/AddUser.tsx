import React, { FC } from "react";
import UserAddForm from "../components/UserAddForm/UserAddForm";
import adduser from "../assets/adduser.jpg";


const AddUser: FC = () => {
  return (
    <div className="container mx-auto mt-1">
      <h1 className="text-3xl font-semibold mb-4">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <img className="object-contain w-44" src={adduser} alt="add user" />
            <p className="text-3xl">Add user</p>
          </div>
        </div>
      </h1>
      <UserAddForm />
    </div>
  );
};

export default AddUser;
