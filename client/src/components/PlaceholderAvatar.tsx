import React, { FC } from "react";

interface Props {
  username: string;
}

const PlaceholderAvatar: FC<Props> = ({ username }) => {
  return (
    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
      {username?.charAt(0).toUpperCase()}
    </div>
  );
};

export default PlaceholderAvatar;
