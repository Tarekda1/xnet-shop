import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // You can add your authentication logic here
    // For this example, we'll just log the values to the console
    console.log("Username:", username);
    console.log("Password:", password);

    // Reset the form fields
    // setUsername("");
    // setPassword("");
    const res = await signIn({ username, password });
    console.log(res);
    if (res.status === 200) {
      navigate("/", { replace: true });
    }
    else {
      setError("Invalid login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <LoginForm
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleLoginSubmit}
        />
        <div><p className="text-sm mt-1 flex flex-row">
          To create a new account </p>
          <button onClick={(e) => { e.preventDefault(); navigate("/auth/signup") }} className="text-xs text-blue-400">
            Click here
          </button>
        </div>
        {error ? <p className="text-sm  text-red-500 mt-2">{error}</p> : ""}
      </div>
    </div>
  );
};

export default LoginPage;
