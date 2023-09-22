import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface BaseProps {
  children?: any;
}

const PrivateRoute: FC<BaseProps> = ({ children }) => {
  const location = useLocation();
  const {
    user: { accessToken },
  } = useAuthContext();
  if (accessToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
