import Image from "next/image";

import React from "react";

const Logo = () => {
  return (
    <Image
      className=""
      src="/T2-orange.png"
      alt="logo"
      width={180}
      height={38}
      priority
    />
  );
};

export default Logo;
