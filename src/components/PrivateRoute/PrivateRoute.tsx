import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface BaseProps {
  children?: any;
}

const PrivateRoute: FC<BaseProps> = ({ children }) => {
  const location = useLocation();
  const {
    user
  } = useAuthContext();
  if (!user || !user?.accessToken) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
