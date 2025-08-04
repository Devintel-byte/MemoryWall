/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { socket } from "@/app/_socket";
import React from "react";
import { useEffect, useState } from "react";
import Message, { MessageProps } from "./Message";
import { Card1} from "../components/Cards";

const DataSection = () => {
  const [data, setData] = useState<MessageProps[]>([]);
  useEffect(() => {
    socket.connect();

    function onSlingReceived(value: MessageProps) {
      setData((prev) => [...prev, value]);
      console.log("sling value", value);
    }

    socket.on("sling_received", onSlingReceived);

    return () => {
      socket.off("sling_received", onSlingReceived);
    };
  }, []);

  //   if (data) {
  //     return <p>No data yet</p>;
  //   }

  return (
    <main className="gap-4 w-full h-full flex flex-wrap justify-around items-center p-4">
      {data.map(({ name, email = "", message = "", profilePicture }, index) => 
          <Card1
            key={index}
            name={name}
            email={email}
            message={message}
            imageSrc={profilePicture}
          />
      )}
    </main>
  );
};

export default DataSection;
