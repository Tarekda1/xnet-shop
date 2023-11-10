// src/components/AppBar.tsx
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../Avatar/Avatar";
import { useAuth } from "../../hooks/useAuth";

interface AppBarProps {
  // Define any props you might need here
}

const AppBar: React.FC<AppBarProps> = () => {
  // Example user data
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const onSignOutClick = useCallback(
    (e: any) => {
      e.preventDefault();
      signOut();
    },
    [signOut]
  );

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const onSignInClick = useCallback(
    (e: any) => {
      e.preventDefault();
      // clear user
      navigate("/login");
    },
    [navigate]
  );

  return (
    <header className="bg-blue-500 p-4 fixed w-full">
      <nav className="w-full flex items-center justify-between">
        <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-white to-pink-600">
          Xnet Billing System
        </h1>
        <div className="flex items-center space-x-4 ">
          {/* User Avatar */}
          <Link to={`/users/${user?.userId}`}>
            <UserAvatar imageUrl={""} altText={user?.name || ""} />
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-4 text-white">
            {/* Add more navigation links here */}
            {user?.accessToken ? (
              <li>
                <button onClick={onSignOutClick}>
                  Logout <i className="fa fa-sign-out"></i>
                </button>
              </li>
            ) : (
              <li>
                <button onClick={onSignInClick}>Login</button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
