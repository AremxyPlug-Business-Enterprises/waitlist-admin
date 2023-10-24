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
    <main className="bg-[#04177F] py-[20%]">
      <Image
        className="signImage mx-auto md:mx-0"
        src="/waitlistAdminImage.png"
        alt=""
        width={270}
        height={270}
      />
      <div className="relative w-[353px] h-[500px] bg-[#fff] rounded-tl-[30px] rounded-bl-[30px] ml-[5.7%]">
        <Image
          className="signLogo absolute top-[5%] left-[5%]"
          src="/waitlistSignLogo.png"
          alt=""
          width={37}
          height={19}
        />
        <div className=" text-center pt-[20%]">
          <p className="font-bold text-[18.33px]">
            Welcome to <span className="text-[#04177f] ">AremxyPlug!</span>
          </p>
          <p className="font-medium text-[9.39px]">
            The Official Admin Account.
          </p>
        </div>

        <div className="mt-[10%] flex flex-col justify-center items-center">
          <div className="w-[90%] mx-auto flex flex-col gap-[6px]">
            <p className="text-[12px] font-semibold leading-[12px]">
              Domain Email
            </p>
            <div
              style={{ borderColor: border }}
              className="p-[2%] h-[40px] rounded-[2.86px] flex justify-between items-center border-[0.97px] "
            >
              <input
                className=" w-[90%] outline-none text-[12px]"
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
          <div className="mt-[3%] w-[90%] mx-auto flex flex-col gap-[6px]">
            <p className="text-[12px] font-semibold leading-[12px]">Password</p>
            <div
              style={{ borderColor: border2 }}
              className="p-[2%] h-[40px] rounded-[2.86px] flex border-[0.97px] items-center"
            >
              <input
                className=" w-[100%] outline-none text-[12px]"
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

          <div className="my-[6%] w-full flex flex-col gap-[10px]">
            <p className="text-[#04177f] text-[10px] text-center font-semibold">
              Forgot password ?
            </p>
            <div className="flex justify-center items-center gap-[1%]">
              <input
                type="checkbox"
                value={checkbox}
                name="checkbox"
                onChange={handleCheckboxChange}
              />
              <p className="text-[#0006] text-[10px]">Remember me next time!</p>
            </div>
          </div>

          <button
            onClick={handleSignIn}
            className="bg-[#04177f] text-[#fff] w-[90%] text-[12px] rounded-[4px] h-[40px]"
          >
            Sign In
          </button>
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
