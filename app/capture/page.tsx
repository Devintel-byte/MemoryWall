// import Logo from "@/app/_components/Logo";
import React from "react";
import { PhotoCapture } from "./sections";

const CapturePage = async () => {
  // const c = await cookies();

  // if(c.get("consent") === undefined) {
  //     redirect("/")
  // }

  return (
    <div>
      <main className="font-merriweather w-full min-h-screen p-4 flex flex-col justify-center items-center">
        {/* <div className="flex justify-center items-center w-full mb-8 > */}
        {/* <div className="flex justify-center items-center h-16 w-16 md:fixed top-4 left-1 animate-pulse mb-5">
          <Logo />
        </div> */}

        <PhotoCapture />

        {/* bottom animation */}
        {/* <div className="fixed bottom-2 right-2 h-16 w-16 animate-bounce">
          <Logo />
        </div> */}
      </main>
    </div>
  );
};

export default CapturePage;
