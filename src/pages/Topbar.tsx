import React from "react";
import Image from "next/image";

type Props = { toggleSideBar: () => void };

export default function Topbar({ toggleSideBar }: Props) {
  const handleMenuButtonClick = () => {
    toggleSideBar(); 
  };
  return (
    <div className="flex items-center justify-between  h-[40px] shadow-md px-[4%] md:h-[70px] lg:shadow-lg">
      {" "}
      <Image
        className=" md:h-[50px] md:w-[60px] lg:w-[50px] lg:h-[50px]"
        src="/menularge.png"
        alt="Logo"
        width={25}
        height={25}
        onClick={handleMenuButtonClick}
      />
      <p className="text-[12px] md:text-[18px]">Admin Dashboard</p>
      <div className="border-[2px] flex rounded-[8px]">
        {" "}
        <Image
          className=" h-[20px] md:w-[35px] md:h-[35px] lg:w-[24px] lg:h-[24px]"
          src="/logout.png"
          alt="logout"
          width={20}
          height={20}
        />{" "}
        <Image
          className=" h-[20px] md:w-[35px] md:h-[35px] lg:w-[24px] lg:h-[24px]"
          src="/arrow-down.png"
          alt="logout"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
