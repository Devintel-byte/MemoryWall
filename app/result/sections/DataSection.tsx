"use client";
import { socket } from "@/app/_socket";
import React, { useEffect, useState } from "react";
import { Card1 } from "../components/Cards";
import { MessageProps } from "./Message";

const DataSection = () => {
  const [data, setData] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.connect();

    // Handle initial messages
    socket.on('initial_messages', (messages) => {
      setData(messages);
    });

    function onSlingReceived(value: MessageProps) {
      setData((prev) => [...prev, value]);
    }

    socket.on("sling_received", onSlingReceived);

    return () => {
      socket.off("sling_received", onSlingReceived);
      socket.off('initial_messages');
      socket.disconnect();
    };
  }, []);

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