// src/components/UserAvatar.tsx
import React from "react";

interface UserAvatarProps {
  imageUrl: string;
  altText: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, altText }) => {
  return (
    <div className="flex items-center">
      <img src={imageUrl} alt={altText} className="h-8 w-8 rounded-full mr-2" />
      <span className="text-white">{altText}</span>
    </div>
  );
};

export default UserAvatar;
