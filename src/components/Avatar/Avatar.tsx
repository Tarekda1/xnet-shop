// src/components/UserAvatar.tsx
import React from "react";

interface UserAvatarProps {
  imageUrl: string;
  altText: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, altText }) => {
  return (
    <div className="flex items-center">
      {/* <img src={imageUrl} alt={altText} className="h-8 w-8 rounded-full mr-2" /> */}
      <div className="h-8 w-8 rounded-full mr-2 bg-white flex justify-center items-center">
        <i className="fa fa-user"></i>
      </div>
      <span className="text-white underline">{altText}</span>
    </div>
  );
};

export default UserAvatar;
