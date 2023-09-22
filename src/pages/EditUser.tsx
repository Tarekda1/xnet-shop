import React, { FC } from "react";
import EditUserForm from "../components/EditUserForm/EditUserForm";
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

const EditUser: FC = () => {
  const { id } = useParams();
  const { user, loading } = useUser(id || "");
  return (
    <div className="container mx-auto mt-1">
      {loading ? "loading" : <EditUserForm remoteUser={user} />}
    </div>
  );
};

export default EditUser;
