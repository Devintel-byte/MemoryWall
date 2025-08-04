/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { card } from "@/app/_mock";
import { socket } from "@/app/_socket";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef } from "react";
import { toPng } from "html-to-image";

type Props = {
  name: string;
  message: string;
  email: string;
  children?: ReactNode;
};

let count = 0;
const Card = ({ name, email, message, children }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // Truncate message to 70 characters
  const truncatedMessage = message.length > 70 ? `${message.substring(0, 70)}...` : message;

  useEffect(() => {
    console.log("Card component mounted");
    const htmlElement = ref.current;
    if (count == 0) {
      if (htmlElement != null) {
        console.log("htmlElement", htmlElement);

        toPng(htmlElement).then((dataUrl: string) => {
          console.log("canvas", dataUrl);
          socket.emit(
            "profileCreatedEvent",
            {
              name,
              email,
              profilePicture: dataUrl,
            },
            (response: any) => {
              console.log("Response from server:", response);
              console.log(
                "Profile created event emitted with name and profile picture"
              );
            }
          );
        });
      }
      count++;
    }
  }, []);

  return (
    <div
      className="relative w-75 h-[450px] bg-white border border-white p-3 rounded-lg shadow-sm flex flex-col"
      ref={ref}
    >
      {/* Header with name and follow button */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8">
            {card.brands.map((brand, index) => (
            <div key={`${brand.image}-${index}`} className="w-8 h-8">
              <Image
                width={32}
                height={32}
                src={brand.image}
                alt="profile"
                className="w-full h-full"
              />
            </div>
          ))}
          </div>
        </div>
        <button className="text-xs font-bold text-orange-500 border border-orange-500 px-3 py-2">Follow</button>
      </div>

      {/* Image content - fixed aspect ratio */}
      <div className="w-full aspect-square bg-white overflow-hidden">
        {children}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between px-4 pt-3">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs">1,234</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs">456</span>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
      </div>

      {/* Caption area with fixed height and truncation */}
      <div className="px-4 py-2 flex-1 flex flex-col">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-sm text-gray-800 break-words whitespace-normal mt-1">
          {truncatedMessage}
        </p>
        <p className="text-xs text-gray-500 mt-auto truncate">{email}</p>
      </div>
    </div>
  );
};

type CardProps = Props & {
  imageSrc: string;
};

export const Card1 = ({ imageSrc, ...props }: CardProps) => {
  return (
    <Card {...props}>
      <Image
        key={imageSrc}
        src={imageSrc}
        alt="post content"
        width={288}
        height={288}
        className="w-full h-full object-cover"
      />
    </Card>
  );
};