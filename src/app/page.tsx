/* @jsxImportSource react */
"use client";
import Image from "next/image";
import "./page.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default function Home() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [border, setBorder] = useState("#0005");
  const [border2, setBorder2] = useState("#0005");
  const [checkbox, setCheckbox] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleCheckboxChange = (event: { target: { checked: any } }) => {
    const { checked } = event.target;
    setCheckbox(checked);
    if (checked) {
      console.log("true");
    }
  };

  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const emailRegEx = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordRegEx = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/
    );

    if (!emailRegEx.test(input.email)) {
      setBorder("#F95252");
      setEmailError("Invalid Email..");
    } else if (!passwordRegEx.test(input.password)) {
      setPasswordError(
        "Password must have At least one alphabetical character, At least one digit, Contains at least one special characters (e.g., !@#$%^&*) and Minimum length of 8 characters"
      );
      setBorder2("#F95252");
    } else {
      setIsLoading(true);
      setEmailError("");
      setPasswordError("");
      setBorder("#0005");
      setBorder2("#0005");
      setTimeout(() => {
        // setSuccessful(true);
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <main className="bg-[#04177F] py-[20%] md:flex md:py-0 md:pb-0 md:h-[100vh] md:justify-between md:w-[94%]">
      <div className=" md:w-[50%]">
        {" "}
        <Image
          className="signImage mx-auto md:mt-[70%] lg:mt-[6%] "
          src="/waitlistAdminImage.png"
          alt=""
          width={270}
          height={270}
        />
      </div>
      <div className="pl-[5%] md:w-[55%]">
        <div className="relative w-[100%] h-[500px] bg-[#fff]  rounded-tl-[30px] rounded-bl-[30px] md:rounded-tl-[0px] md:rounded-bl-[0] md:h-screen md:ml-[0px] md:flex md:flex-col">
          <Image
            className="signLogo absolute top-[5%] left-[5%] lg:top-[3%] lg:left-[3%]"
            src="/waitlistSignLogo.png"
            alt=""
            width={37}
            height={19}
          />
          <div className="md:absolute md:right-[5%] md:top-[16%] lg:top-[5%] pt-[20%] md:pt-[10%]">
            <p className="text-center font-bold text-[18.33px] lg:text-[32px]">
              Welcome to <span className="text-[#04177f] ">AremxyPlug!</span>
            </p>
            <p className="text-center font-medium text-[9.39px] lg:text-[16px]">
              The Official Admin Account.
            </p>
          </div>

          {/* ====Form===== */}
          <div className="md:absolute md:top-[25%] lg:top-[20%] mt-[10%] flex flex-col justify-center items-center lg:mx-auto md:w-[80%] lg:w-[100%]">
            {/* ======Email input===== */}
            <div className=" w-[90%] mx-auto flex flex-col gap-[6px] md:ml-[33%] lg:ml-[29%]">
              <p className="text-[12px] font-semibold leading-[12px] lg:text-[16px] ">
                Domain Email
              </p>
              <div
                style={{ borderColor: border }}
                className="p-[2%] h-[40px] rounded-[2.86px] flex justify-between items-center border-[0.97px] lg:h-[51px] lg:w-[375px]"
              >
                <input
                  className=" w-[90%] outline-none text-[12px] lg:text-[16px]"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleInput}
                />
                <Image
                  className="email-log h-[16px]"
                  src="/sms.png"
                  alt="email-logo"
                  width={16}
                  height={20}
                />
              </div>
              <p className="text-[#F95252] text-[11px]"> {emailError}</p>
            </div>

            {/* ==== Password input==== */}
            <div className="mt-[3%] w-[90%] mx-auto flex flex-col gap-[6px]  md:ml-[33%] lg:ml-[29%]">
              <p className="text-[12px] font-semibold leading-[12px] lg:text-[16px]">
                Password
              </p>
              <div
                style={{ borderColor: border2 }}
                className="p-[2%] h-[40px] rounded-[2.86px] flex border-[0.97px] items-center lg:h-[51px] lg:w-[375px] "
              >
                <input
                  className=" w-[100%] outline-none text-[12px] lg:text-[16px]"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                />
                <div onClick={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                    <AiOutlineEyeInvisible className="text-[#92ABFE] w-[20px] h-[20px]" />
                  ) : (
                    <AiOutlineEye className="text-[#92ABFE]" />
                  )}
                </div>
              </div>
              <p className="text-[#F95252] text-[11px]"> {passwordError}</p>
            </div>

            <div className="my-[6%] w-full flex flex-col gap-[10px] md:ml-[48%] lg:ml-[20%]">
              <p className="text-[#04177f] text-[10px] text-center font-semibold lg:text-[14px]">
                Forgot password ?
              </p>
              <div className="flex justify-center items-center gap-[1%]">
                <input
                  type="checkbox"
                  value={checkbox}
                  name="checkbox"
                  onChange={handleCheckboxChange}
                />
                <p className="text-[#0006] text-[10px] md:text-[12px]">
                  Remember me next time!
                </p>
              </div>
            </div>

            {/* ====button==== */}
            <button
              onClick={handleSignIn}
              className="bg-[#04177f] text-[#fff] w-[90%] text-[12px] rounded-[4px] h-[40px] md:w-[113px] md:h-[38px] md:ml-[50%] lg:ml-[18%]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
    </main>
  );
}
