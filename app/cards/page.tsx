import Image from "next/image";
import React from "react";
import Logo from "../_components/Logo";
import { card } from "../_mock";

const CardPage = () => {
  return (
    <div className="grid grid-cols-6">
      {/* card 1 */}
      <div className="relative w-60 h-80 overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="relative rounded-t-lg  h-[35%] bg-red-500 w-full">
          <Image src={card.header.background} alt="card bg" fill />
          <div className="rounded-full outline-3 outline-white bg-transparent border-4 border-transparent overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/4">
            <Image
              src="/images/pic.jpg"
              alt="profile picture"
              width={400}
              height={400}
              className="drop-shadow-sm h-full w-full"
            />
          </div>
        </div>

        {/* name and message */}
        <div className="text-center p-5 absolute bottom-3 left-0 w-full">
          <h5 className="text-lg md:text-xl font-bold tracking-tight text-gray-700">
            John Doe
          </h5>
          <p className="mb-3 font-normal text-slate-700">
            Here are the biggest enterprise
          </p>
        </div>

        {/* Brand logo */}
        <div className="absolute bottom-4 left-0 w-full flex flex-row justify-between px-2 md:px-4">
          <div className="w-6 h-6">
            <Logo />
          </div>

          {card.brands.map(({ image }, index) => (
            <div className="w-6 h-6">
              <Image
                width={40}
                height={40}
                key={`${image}-${index}`}
                src={image}
                alt={`${image}-${index}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* card 2 */}
      <div className="relative w-60 h-80 overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="relative bg-red-500 rounded-b-full h-3/5 w-full overflow-hidden p-4 ">
          {/* background image */}
          <Image
            src={card.header.background}
            alt="card bg"
            fill
            className="object-cover object-right"
          />
          {/* profile picture */}
          <div className="rounded-full outline-3 outline-white bg-transparent border-4 border-transparent overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/6">
            <Image
              src="/images/pic.jpg"
              alt="profile picture"
              width={400}
              height={400}
              className="drop-shadow-sm h-32 w-36"
            />
          </div>
        </div>

        {/* name and message */}
        <div className="text-center p-5 absolute bottom-3 left-0 w-full">
          <h5 className="text-lg md:text-xl font-bold tracking-tight text-gray-700">
            John Doe
          </h5>
          <p className="mb-3 font-normal text-slate-700">
            Here are the biggest enterprise
          </p>
        </div>

        {/* Brand logo */}
        <div className="absolute bottom-4 left-0 w-full flex flex-row justify-between px-2 md:px-4">
          <div className="w-6 h-6">
            <Logo />
          </div>

          {card.brands.map(({ image }, index) => (
            <div className="w-6 h-6">
              <Image
                width={40}
                height={40}
                key={`${image}-${index}`}
                src={image}
                alt={`${image}-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPage;
