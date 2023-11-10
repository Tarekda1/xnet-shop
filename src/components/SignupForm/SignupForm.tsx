import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface SignupForm {
  name: string,
  email: string,
  password: string,
  confirmPassword: string;
  username: string;
  confirmpassword: string;
  birthday: string;
}


const SignupForm: React.FC = ({
}) => {
  const { handleSubmit, control, register, formState: { errors }, setValue } = useForm<SignupForm>();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
    const resp = await signUp(data);
    if (resp?.success === "ok") {
      navigate("/auth/login");
    }
    console.log(resp);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full mb-4">
        <div className="flex flex-row w-full">
          <div className="mb-4 w-1/2">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="input"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="name"
            />
            {errors.name ? <p className="pt-1 text-red-500">required</p> : ""}
          </div>
          <div className="mb-4 w-1/2 ml-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              autoComplete={"false"}
              {...register("email")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="email"
            />
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="mb-4 w-1/2">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="input"
              id="username"
              {...register("username", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="username"
            />
            {errors.username ? <p className="pt-1 text-red-500">required</p> : ""}
          </div>
          <div className="mb-4 w-1/2 ml-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="password"
            />
            {errors.password ? <p className="pt-1 text-red-500">required</p> : ""}
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm  password
            </label>
            <input
              type="password"
              id="password"
              {...register("confirmpassword", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="password"
            />
            {errors.confirmPassword ? <p className="pt-1 text-red-500">required</p> : ""}
          </div>
          <div className="mb-4 w-1/2 ml-4">
            <label
              htmlFor="birthday"
              className="block text-gray-700 font-medium mb-2"
            >
              Birthday
            </label>
            <input
              id="birthday"
              {...register("birthday")}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
              placeholder="birthday"
            />
          </div>
        </div>

      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Signup
      </button>

    </form>
  );
};

export default SignupForm;
