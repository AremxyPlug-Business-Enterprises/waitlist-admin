import React, { useState } from "react";
import Image from "next/image";
import "../app/globals.css";
import "../pages/pages.css";
import Link from "next/link";

type Props = { toggleSideBar: () => void; sidebarVisible: any };

export default function Sidebar({ toggleSideBar, sidebarVisible }: Props) {
  return (
    <div
      className={` z-50 fixed bg-[#04177f] flex flex-col justify-between w-[188px] h-[660px] rounded-tr-[15px] rounded-br-[15px] md:w-[290px] lg:w-[320px] lg:h-[100vh] lg:rounded-tr-[25px] lg:rounded-br-[25px] ${
        sidebarVisible ? "" : "hidden"
      }`}
    >
      <div>
        <div className=" flex justify-between items-center px-[8%] py-[8%] border-b-[0.5px] border-b-[#fff] lg:px-[5%] lg:py-[6%]">
          <Image
            className="w-[auto] h-[14px] md:h-[20px] md:w-[107px] lg:w-[125px] lg:h-[25px]"
            src="/aremxyLogo.png"
            alt="Logo"
            width={75}
            height={0}
          />
          <Image
            className="cursor-pointer md:w-[30px] md:h-[30px] lg:h-[40px] lg:w-[40px]"
            src="/menumenu.png"
            alt="Menu"
            width={30}
            height={30}
            onClick={toggleSideBar}
          />
        </div>
        <div className="flex gap-[10px] pl-[5%] pt-[8%] md:items-center">
          <Image
            className="w-[auto] h-[58.6px] md:w-[65px] md:h-[65px] lg:w-[100px] lg:h-[100px]"
            src="/adminImage.png"
            alt="DP"
            width={58}
            height={0}
          />
          <div>
            <p className="text-[14px] text-white md:text-[20px]">Admin</p>
            <p className="text-[8px] text-white md:text-[14px]">AremxyPlug</p>
            <p className="text-[8px] text-white md:text-[14px]">
              Hello@aremxyplug.com
            </p>
          </div>
        </div>

        <div className=" border-b-[0.5px] pb-[5%]">
          <div className="flex bg-[#f2faff20]  w-[169px] h-[29px] mx-auto rounded-[6px] mt-[10%] md:h-[50px] md:w-[90%] lg:rounded-[10px]">
            <div className="flex items-center gap-[10px] p-2">
              <Image
                className="w-[auto] h-[10px] md:w-[13px] md:h-[13px] lg:h-[24px] lg:w-[24px]"
                src="/dashboardimg.png"
                alt="3squares"
                width={10}
                height={10}
              />
              <span className="text-[#fff] text-[10px] font-semibold md:text-[14px] lg:text-[14px] ">
                Dashboard
              </span>
            </div>
          </div>
        </div>

        <div className="text-white p-[7%]">
          <p className="text-[14px] md:text-[18px]">FEATURES</p>
          <div className="flex gap-[8px] mt-[6%]">
            <Image
              className="w-[auto] h-[19px] md:w-[18px] md:h-[19px] lg:h-[24px] lg:w-[24px]"
              src="/listIcon.png"
              alt="3squares"
              width={15}
              height={10}
            />
            <p className="text-[12px] md:text-[16px]">Waitlist</p>
          </div>
        </div>
      </div>

      {/* ====Logout===== */}
      <div
        className={`text-white pl-[5%] mt-[%] border-t-[0.3px] ml-[%] flex gap-[4%] md:mt-[%] md:border-t-[1.5px] py-[10%] lg:pb-[5%] lg:pt-[5%] lg:text-[14px]`}
      >
        <Image
          className="w-[auto] h-[20px] md:w-[25px] md:h-[25px] lg:w-[24px] lg:h-[24px]"
          src="/logout.png"
          alt="logout"
          width={20}
          height={20}
        />
        <div
          className={` cursor-pointer text-[12px] md:text-[16px] lg:text-[16px]`}
        >
          <Link href="/">
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
