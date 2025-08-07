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
      // return () => clearInterval(interval);
      //   clearInterval(interval);
      //   setTimeLeft(3);
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
    // console.log("Submitted", { name, message });
    e.preventDefault();
    reset();
    const data = {
      user: { name, message, email, phoneNumber: "" },
      event: "sling",
      profilePicture: imageSrc, // This is the base64 image data
    };
   const compressedImage = imageSrc.replace(/^data:image\/\w+;base64,/, '');
    socket.emit("slingEvent", { 
      ...data, 
      profilePicture: compressedImage 
    });
  };

  return (
    <div className="flex flex-col items-center  gap-10 justify-center">
      <div className="relative w-[600px] h-[450px]">
        {!imageSrc && (
          <Webcam
            audio={false}
            ref={webcamRef}
            mirrored
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user", // "environment" for back camera
            }}
            style={{
              width: APP_INFO.photo.width,
              height: APP_INFO.photo.height,
            }}
            // className={"h-84"}
          />
        )}
        {!!imageSrc && (
          <Image
            src={imageSrc}
            alt="Captured photo"
            className="absolute"
            width={600}
            height={450}
          />
        )}
        {startCountdown && (
          <div className="absolute z-30 left-0 right-0 flex justify-center items-center top-1/2">
            <Countdown
              date={Date.now() + APP_INFO.photo.countdown}
              renderer={(props) => (
                <span className="text-6xl text-white font-extrabold">
                  {" "}
                  {props.seconds}{" "}
                </span>
              )}
            />
          </div>
        )}
      </div>
      {/* <button onClick={capture}>Capture photo</button> */}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          aria-label="name"
          placeholder="Name: "
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-white p-2 rounded w-96 h-16 text-xl md:text-2xl focus:outline-none placeholder:text-white/50 text-white"
        />
        <input
          type="text"
          value={email}
          aria-label="email"
          placeholder="Email: "
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-white p-2 rounded w-96 h-16 text-xl md:text-2xl focus:outline-none placeholder:text-white/50 text-white"
        />
        <textarea
          rows={3}
          value={message}
          aria-label="message"
          placeholder="Brief message here... "
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-white p-2 rounded focus:outline-none h-24 text-xl md:text-2xl placeholder:text-white/50 text-white"
        />
      </form>
      <div>
        {!imageSrc && (
          <Button onClick={capture} disabled={!!imageSrc} className="bg-white text-orange-500">
            capture
          </Button>
        )}
        {imageSrc && (
          <div className="flex flex-row gap-4">
            <Button 
              onClick={retake} className="bg-orange-200">
                Retake
              </Button>
            <Button
              type="submit"
              disabled={!name}
              onClick={handleSubmit}
              className="text-white"
              variant="success"
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCapture;
