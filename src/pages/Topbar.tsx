import React, { useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = { toggleSideBar: () => void };

export default function Topbar({ toggleSideBar }: Props) {
  const [logout, setLogout] = useState(false);

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
      <div
        className="border-[2px] flex rounded-[8px]"
        onClick={() => setLogout(!logout)}
      >
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
      {logout && (
        <ul className="z-[99px] bg-white border drop-shadow-xl absolute top-[5%] right-[5%]  ml-[12px] mt-[px] rounded-[3px] w-[95px] md:top-[5%] md:w-[154px] lg:rounded-[6px] lg:right-[4%] lg:top-[10.5%] lg:w-[200px] lg:ml-[19px]">
          <li className="z-[99px] ursor-pointer hover:underline pt-1 pb-1 pl-1 text-[9px] font-medium border-b-[0.22px] md:border-b-[1.335px] md:text-[16px] md:p-3 lg:pt-[6%] lg:pb-[6%] lg:pl-[6%] lg:border-b-[0.6px] lg:text-[14px] ">
            My Profile
          </li>
          <Link href="/">
            <li className="z-[99px] cursor-pointer hover:underline pt-1 pb-1 pl-1 text-[9px] font-medium md:border-b-[1.335px] md:text-[16px]  md:p-3 lg:pt-[6%] lg:pb-[6%] lg:pl-[6%] lg:border-b-[0.6px] lg:text-[14px] ">
              Logout
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
}
