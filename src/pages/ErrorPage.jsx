import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-[10px] lg:gap-[20px] pt-[40%] lg:pt-[4%] mx-[5%]">
      <h1 className="lg:text-[190px] font-extrabold text-[#0005] text-[100px] text-center md:text-[170px]">
        404
      </h1>
      <div className="font-bold text-[14px] md:text-[25px] text-center">
        Oops! This Page Could Not Be Found
      </div>
      <p className="text-[#0008] text-[14px] md:text-[20px] text-center">
        SORRY BUT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAVE BEEN
        REMOVED, NAME CHANGED OR IS TEMPORARILY UNAVAILABLE
      </p>
      <Link
        to="/"
        className="p-2 text-center md:w-[50%] md:text-[20px] lg:w-[30%] md:mx-auto rounded-[10px] text-white bg-[#04177f] text-[14px]"
      >
        GO TO HOMEPAGE
      </Link>
    </div>
  );
}
