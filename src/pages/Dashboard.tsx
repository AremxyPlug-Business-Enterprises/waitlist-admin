import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from "axios";
import { Loader } from "../app/Loader/Loader";
import Modal from "@/app/Modal/Modal";

type Props = {};
type EmailData = {
  Email: string;
};

const Dashboard = (_props: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteSuccessPopUp, setDeleteSuccessPopUp] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    // Function to make the API request
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://waitlist-api-production-0759.up.railway.app/api/getWaitlist"
        );
        const sortedData = response.data.sort(
          (a: { Timestamp: number }, b: { Timestamp: number }) =>
            a.Timestamp - b.Timestamp
        );
        setData(sortedData);
        // console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError("Network Error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const axiosInstance = axios.create({
  //   baseURL: "https://waitlist-api-production-0759.up.railway.app/api",
  //   timeout: 5000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // =====Function to delete an email=====
  const deleteEmail = async (email: string) => {
    try {
      console.log("before");
      const response = await axios.delete(
        `https://waitlist-api-production-0759.up.railway.app/api/deleteWaitlist/${email}`
      );
      console.log(response, "here");

      if (response.status === 200) {
        // Close the delete confirmation pop-up
        setDeletePopUp(false);
        // Show the delete success pop-up
        setDeleteSuccessPopUp(true);
      }
      const updatedData = data.filter(
        (item: { Email: string }) => item.Email !== email
      );
      setData(updatedData);
      console.log(updatedData);
    } catch (error) {
      alert("Unable to delete due to bad network");
      console.error("Error deleting email:", error);
    }
  };

  const handleDeleteConfirmation = (email: string) => {
    deleteEmail(email);
  };

  return (
    <div>
      <div className={` ${sidebarVisible ? "" : "hidden"}`}>
        <Sidebar
          toggleSideBar={toggleSidebar}
          sidebarVisible={sidebarVisible}
        />
      </div>
      <Topbar toggleSideBar={toggleSidebar} />

      {/* =======content===== */}
      <div
        className={`${
          sidebarVisible ? "lg:ml-[26%]" : ""
        } px-[5%] pt-[12%] lg:pt-[2%]`}
      >
        {" "}
        <div className="flex justify-between">
          <h1 className="font-semibold md:text-[26px]">Waitlist Emails</h1>
          <Image
            className="w-auto h md:w-[35px] md:h-[35px] lg:w-[24px] lg:h-[24px]"
            src="/droplist.png"
            alt="logout"
            width={20}
            height={20}
          />
        </div>
        <div className="flex justify-center items-center h-[65px] bg-[#e2f3ff] shadow-sm rounded-[5px] mt-[6%] md:h-[75px] md:rounded-[10px] md:shadow-lg lg:mt-[2%]">
          <p className="text-[14px] text-[#04177F] md:text-[18px]">
            Total Registered Emails - {data.length}
          </p>
        </div>
        <div className="my-[6%] rounded-[5px] flex text-[14px] bg-[#EBEEFF] justify-between items-center p-2 md:p-4 lg:my-[2%]">
          <input
            className="bg-transparent w-[100%] md:text-[20px] outline-none"
            type="text"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BsSearch className="md:text-xl" />
        </div>
      </div>

      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-500 ml-[5%] text-[14px] md:text-[18px]">
            Error: Network Error
          </p>
        ) : (
          <div
            className={`h-[366px] overflow-scroll md:h-[600px] ${
              sidebarVisible ? "lg:ml-[27.5%]" : ""
            } `}
          >
            <ul>
              {data.map((item: { Email: string }, index) => (
                <li
                  className="flex justify-between items-center border mb-[2%] mx-[5%] text-[12px] h-[33px] px-[2%] rounded-[5px] md:text-[16px] md:h-[45px] lg:mb-[5px]"
                  key={index}
                >
                  <p className="text-[#0008]">{item.Email}</p>
                  <BiDotsVerticalRounded
                    // onClick={() => setDeletePopUp(true)}
                    onClick={() => deleteEmail(item.Email)}
                    className="text-lg"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {deletePopUp && (
        <Modal>
          <div className="w-[300px] h-[219px] shadow-[#0005] bg-white rounded-[11px]">
            <hr className="mt-[10%] mb-[5%] h-[9px] bg-[#04177f] border-none md:h-[10px]" />
            <p className=" text-[12px] font-semibold text-center">
              Are you sure you want to delete this email ?
            </p>

            <div className="flex justify-center gap-[5%] mt-[25%]">
              <button
                // onClick={() => handleDeleteConfirmation(data[index].Email)}
                // onClick={() => deleteEmail(item.Email)}
                className="text-[10px] text-[#f95252] w-[95px] h-[22px] border-[1px] rounded-[7px]"
              >
                Yes
              </button>
              <button
                onClick={() => setDeletePopUp(false)}
                className="text-[10px] text-white w-[95px] h-[22px] bg-[#04177f] rounded-[7px]"
              >
                Exit
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteSuccessPopUp && (
        <Modal>
          <div className="w-[300px] h-[219px] shadow-[#0005] bg-white rounded-[11px]">
            <hr className="mt-[10%] mb-[5%] h-[9px] bg-[#04177f] border-none md:h-[10px]" />
            <p className=" text-[12px] font-semibold text-center">Successful</p>
            <p className=" text-[12px] font-semibold text-center">
              Email has been deleted successfully
            </p>
            <Image
              className="mt-[2%] w-auto h-[50px] mx-auto lg:w-[60px] lg:h-[60px]"
              src="/Gif/checkMarkGif.gif"
              alt="/"
              width={50}
              height={50}
            />
            <div className="flex justify-center gap-[5%] mt-[12%]">
              <button
                onClick={() => setDeleteSuccessPopUp(false)}
                className="text-[10px] text-white w-[95px] h-[22px] bg-[#04177f] rounded-[7px]"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
