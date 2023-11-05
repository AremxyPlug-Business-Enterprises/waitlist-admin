import Modal from "@/app/Modal/Modal";
import React, { Component } from "react";

type Props = { setForgetPassword: any };

type State = { email: string; isValidEmail: boolean };

export default class Forgetpassword extends Component<Props, State> {
  state = { email: "", isValidEmail: true };

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const isValidEmail =
      /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
    this.setState({ email, isValidEmail });
  };

  render() {
    const { isValidEmail } = this.state;

    return (
      <Modal>
        <div className="bg-white shadow-md w-[100%] mx-[6%] px-[18px] py-[80px] rounded-[10px] lg:px-[31px] lg:py-[61px] lg:w-[30%] lg:ml-[53%]">
          <p className="text-[10px] text-center mb-[7%]">
            Input your email to reset password
          </p>
          <div className="flex flex-col gap-[15px]">
            <input
              className={`text-[12px] h-[30px] border-[1px] border-[#0004] outline-none rounded-[3px] lg:text-[16px]`}
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            {!isValidEmail && (
              <p className="text-red-500 text-[10px]">Invalid email</p>
            )}
            <button
              className={`h-[40px] text-[10px] ${
                isValidEmail ? "bg-[#0006]" : "bg-[#04177f]"
              } rounded-[3px] text-white lg:w-[40%] lg:h-[34px] lg:rounded-[5px] lg:mx-auto`}
            >
              Reset
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
