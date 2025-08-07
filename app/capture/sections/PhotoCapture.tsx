"use client";
import Countdown from "react-countdown";
import Button from "@/app/_components/button";
import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import { APP_INFO } from "@/app/_mock";
import { socket } from "@/app/_socket";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PhotoCapture = () => {
  const [imageSrc, setImageSrc] = useState("");
  const webcamRef = useRef<Webcam>(null);
  const [name, setName] = useState<string>("");
  const { push } = useRouter();

  useEffect(() => {
    // validate consent
    const consent = localStorage.getItem("consent");
    if (!consent) {
      push("/"); // Redirect to home if no consent
    }
  }, [push]);

  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [startCountdown, setStartCountdown] = useState(false);

  const capture = () => {
    setStartCountdown(true);
    setTimeout(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc ?? "");
        console.log(imageSrc); // Base64 image data
      }
      setStartCountdown(false);
    }, APP_INFO.photo.countdown);
  };

  const retake = () => {
    setImageSrc("");
  };

  const reset = () => {
    setName("");
    setMessage("");
    setImageSrc("");
    setEmail("");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reset();
    const data = {
      user: { name, message, email, phoneNumber: "" },
      event: "sling",
      profilePicture: imageSrc,
    };
    socket.emit("slingEvent", data, (response: string) => {
      console.log("Response from server:", response);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full">
      {/* Webcam/Image Container */}
      <div className="relative w-full max-w-[600px] h-[450px] md:h-[500px]">
        {!imageSrc && (
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
            }}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        {!!imageSrc && (
          <Image
            src={imageSrc}
            alt="Captured photo"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            width={600}
            height={450}
          />
        )}
        {startCountdown && (
          <div className="absolute inset-0 flex justify-center items-center bg-black/30 rounded-lg">
            <Countdown
              date={Date.now() + APP_INFO.photo.countdown}
              renderer={(props) => (
                <span className="text-6xl text-white font-extrabold">
                  {props.seconds}
                </span>
              )}
            />
          </div>
        )}
      </div>

      {/* Form Container */}
      <form className="flex flex-col gap-4 w-full max-w-md mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          aria-label="name"
          placeholder="Name: "
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-white p-4 rounded w-full h-16 text-lg md:text-xl focus:outline-none placeholder:text-white/50 text-white bg-transparent"
          required
        />
        <input
          type="email"
          value={email}
          aria-label="email"
          placeholder="Email: "
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-white p-4 rounded w-full h-16 text-lg md:text-xl focus:outline-none placeholder:text-white/50 text-white bg-transparent"
        />
        <textarea
          rows={3}
          value={message}
          aria-label="message"
          placeholder="Brief message here... "
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-white p-4 rounded focus:outline-none min-h-24 text-lg md:text-xl placeholder:text-white/50 text-white bg-transparent w-full"
        />
      </form>

      {/* Buttons Container */}
      <div className="mt-6 w-full max-w-md flex flex-col sm:flex-row justify-center gap-4">
        {!imageSrc ? (
          <Button 
            onClick={capture} 
            disabled={!!imageSrc} 
            className="bg-white text-orange-500 w-full sm:w-auto px-8 py-4 text-lg"
          >
            Capture
          </Button>
        ) : (
          <>
            <Button 
              onClick={retake} 
              className="bg-orange-200 w-full sm:w-auto px-8 py-4 text-lg"
            >
              Retake
            </Button>
            <Button
              type="submit"
              disabled={!name}
              onClick={handleSubmit}
              className="text-white w-full sm:w-auto px-8 py-4 text-lg"
              variant="success"
            >
              Submit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoCapture;