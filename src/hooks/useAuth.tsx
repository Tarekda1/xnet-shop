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

  const signIn = async (data: { username: any; password: any }) => {
    try {
      const resp = await axios({
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
      console.error(err);
    }
  };

  const signOut = () => {
    localStorage.setItem("user", "");
    navigate("/login");
  };

  return { signIn, signOut, user };
};
