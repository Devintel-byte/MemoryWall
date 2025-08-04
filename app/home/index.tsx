"use client";
import React, { useState } from "react";
// import Logo from "@/app/_components/Logo";
import { COMPANY_INFO } from "@/app/_mock";
import { PATH_PAGE } from "@/app/_routes";
import { useRouter } from "next/navigation";
import { COOKIES } from "../_server/actions/cookies";
import Button from "@/app/_components/button";

const HomeSections = () => {
  // const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const { push } = useRouter();

  const checkboxStyle = "w-12 h-12 p-3 bg-white text-white accent-orange-400 ring-2 ring-white";
  const textStyle =
    "text-md sm:text-lg md:text-2xl sm:ml-4 font-normal text-gray-800 line-clamp-3 ";
  return (
    <main className="font-merriweather w-screen h-screen flex flex-col justify-center items-center">
      {/* <div className="flex justify-center items-center w-full mb-8">
        <Logo />
      </div> */}
      <div className="flex flex-col gap-6 max-w-[860px] text-center px-1">
        <div className="grid grid-cols-[20px_1fr] gap-8 justify-center items-center">
          <input
            type="checkbox"
            className={checkboxStyle}
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <div className="flex bg-white rounded-full p-4 ml-3">
            <p className={textStyle}>{COMPANY_INFO.legal.marketing.text} </p>
          </div>
        </div>

        {/* <div className="grid grid-cols-[20px_1fr] gap-8 justify-center items-center">
          <input
            type="checkbox"
            className={checkboxStyle}
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
          />
          <span className={textStyle}>{COMPANY_INFO.legal.privacy.text}</span>
        </div> */}
        <p>
          <Button
            className={`bg-white text-orange-500`}
            disabled={!marketing}
            onClick={() => {
              if (marketing) {
                // Proceed to the next step or action
                localStorage.setItem(COOKIES.consent, "true");
                console.log("Proceeding with consent...");
                push(PATH_PAGE.capture.root); 
              }
            }}
          >
            proceed
          </Button>
        </p>
      </div>
    </main>
  );
};

export default HomeSections;
