import { User } from "../entities/User";
import axios from "../providers/axios";
import { useNavigate } from "react-router-dom";

// export type User = {
//   UserInfo: {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//     phone: string;
//   };
//   userId?: string;
//   accessToken?: string;
//   refreshToken?: string;
// };

export const useAuth = () => {
  const navigate = useNavigate();
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user") || "") as User;
  } catch (error) {}

  const signIn = async (data: { username: any; password: any }) :Promise<any> => {
    let resp:any;
    console.log(data);
    try {
       resp = await axios({
        method: "POST",
        url: `/auth/login`,
        data: {
          username: data.username,
          password: data.password,
        },
      });
      console.log(resp);
      console.log(resp?.headers?.jwttoken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: resp?.data.userId,
          accessToken: resp?.data?.accessToken,
          refreshToken: resp?.data?.refreshToken,
          name: resp?.data?.name,
          email: resp?.data?.email,
        })
      );
    } catch (err) {
      console.log(err);
      resp = err;
      console.error(err);
    }
    console.log(resp);
    return resp;  
  };

  const signUp = async (data: { username: any; password: any ,name:any,email:any}) :Promise<any> => {
    let resp:any;
    console.log(data);
    try {
       resp = await axios({
        method: "POST",
        url: `/auth/signup`,
        data: {
          username: data.username,
          password: data.password,
          name:data.name,
          email:data.email
        },
      });
      console.log(resp);
      console.log(resp?.headers?.jwttoken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: resp?.data.userId,
          accessToken: resp?.data?.accessToken,
          refreshToken: resp?.data?.refreshToken,
          name: resp?.data?.name,
          email: resp?.data?.email,
        })
      );
    } catch (err) {
      console.log(err);
      resp = err;
      console.error(err);
    }
    console.log(resp);
    return resp;  
  };

  const signOut = () => {
    localStorage.setItem("user", "");
    navigate("/auth/login");
  };

  return { signIn, signOut, user,signUp };
};
