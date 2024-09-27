import React from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="bg-gray-300 w-full h-full flex items-center justify-center">
          U
        </div>
      )}
    </div>
  );
};

export default Avatar;
