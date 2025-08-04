"use client";
import { socket } from "@/app/_socket";
import React from "react";
import { useEffect, useState } from "react";
import Message, { MessageProps } from "./Message";
import Card2, { Card1 } from "../components/Cards";

const DataSection = () => {
    //  const data: MessageProps[] = [
    //   {
    //     name: "uche", message: "this is my message 1",
    //     position: {x: 10, y: 10},
    //     profilePicture: "./src/assets/uploads/07-05-2024/emen.png",
    //     phoneNumber: "0802333212"
    //   },
    //   {
    //     name: "emma", message: "this is my message 2",
    //     position: {x: 700, y: 100},
    //     profilePicture: "./src/assets/uploads/07-05-2024/emeka.png",
    //     phoneNumber: "0802333212"
    //   },
    //   {
    //     name: "peter", message: "this is my message 3",
    //     position: {x: 100, y: 400},
    //     profilePicture: "./src/assets/uploads/07-05-2024/john.png",
    //     phoneNumber: "0802333212"
    //   },
    //   {
    //     name: "Joel", message: "this is my message 4",
    //     position: {x: 500, y: 500},
    //     profilePicture: "./src/assets/uploads/07-05-2024/emeka.png",
    //     phoneNumber: "0802333212"
    //   },
    //   {
    //     name: "Sandra", message: "this is my message ",
    //     position: {x: 1000, y: 800},
    //     profilePicture: "./src/assets/uploads/07-05-2024/emeka.png",
    //     phoneNumber: "0802333212"
    //   },
    //   {
    //     name: "Divine", message: "this it my message 6",
    //     position: {x: 1200, y: 300},
    //     profilePicture: "./src/assets/uploads/07-05-2024/emeka.png",
    //     phoneNumber: "0802333212"
    //   },
    // ]
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
      {data.map(({ name, message, profilePicture }, index) => (
        <Message
          key={index}
          name={name}
          message={message}
          profilePicture={profilePicture}
        />
      ))}
    </main>
  );
};

export default DataSection;
