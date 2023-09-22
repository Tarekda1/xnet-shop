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
  const userImageUrl = "path_to_user_avatar.png"; // Replace with actual user image URL
  const userName = "John Doe"; // Replace with actual user name
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const onSignOutClick = useCallback(
    (e: any) => {
      e.preventDefault();
      signOut();
    },
    [signOut]
  );

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
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-semibold">My App</h1>
        <div className="flex items-center space-x-4 ">
          {/* User Avatar */}
          <Link to="/user">
            <UserAvatar imageUrl={userImageUrl} altText={userName} />
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-4 text-white">
            {/* Add more navigation links here */}
            {user?.accessToken ? (
              <li>
                <button onClick={onSignOutClick}>Logout</button>
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
