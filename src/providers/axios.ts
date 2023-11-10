import { FC } from "react";
import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../utils/storageUtils";
import routes from "../routes/routes";

// axios instance
export const cancelTokenSource = axios.CancelToken.source();
const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  cancelToken: cancelTokenSource.token,
});

interface BaseProps {
  children?: any;
}

const AxiosInterceptor: FC<BaseProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const resInterceptor = (response: any) => {
      return response;
    };

    const errInterceptor = (error: { response: { status: number } }) => {
      if (error.response.status === 401) {
        //redirect logic here
        clearToken();
        navigate(routes.login);
      }
      console.log(error.response)
      return (error.response);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [navigate]);

  return children;
};

export default instance;
export { AxiosInterceptor };
