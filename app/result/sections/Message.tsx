import React from "react";
import Image from "next/image";

export type MessageProps = {
  name: string;
  message?: string;
  email?: string;
  profilePicture: string; // Optional image prop
};


const Message = ({ name, message, profilePicture }: MessageProps) => {
  return (
    <div className="relative flex flex-row w-[260px] ">
      <div className="z-10 flex flex-col justify-end relative text-white">
        {/* Image */}
        <div className="bg-gray-900 overflow-hidden relative ml-auto w-32 h-20 mb-1 border-2 p-1 rounded-lg border-white text-center">
          <Image src={profilePicture} alt={name} fill />
        </div>
        {/* Name */}
        <div className="bg-gray-700 relative ml-[15%] w-28 border-2 px-1 py-2 rounded-lg border-white text-center">
          {/* <span className="text-xs">Name</span> */}
          <p className="text-xl font-bold font-merriweather line-clamp-1 capitalize">
            {name ?? "John Doe"}{" "}
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-gray-900 right-2 min-h-12 absolute -translate-y-1/2 top-1/2 w-32 px-1 py-2 border-2 rounded-lg border-white text-center">
        {/* <span className="text-xs">Message</span> */}
        <p className="line-clamp-2 text-sm font-merriweather first-letter:capitalize">{message ?? "Nice"}</p>
      </div>
    </div>
  );
};

export default Message;
