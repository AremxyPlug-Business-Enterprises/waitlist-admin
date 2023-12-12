import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from "axios";
import { Loader } from "../app/Loader/Loader";
import Modal from "@/app/Modal/Modal";
import { saveAs } from "file-saver";

type Props = {};
type EmailData = {
  Email: string;
};

const LOGOUT_TIME = 900000;

const Dashboard = (_props: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteSuccessPopUp, setDeleteSuccessPopUp] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState("");
  const [filteredData, setFilteredData] = useState<EmailData[]>(data);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Function to reset the activity timer
  const resetActivityTimer = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  // Function to handle user inactivity and trigger logout
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInactivity = () => {
    const currentTime = Date.now();
    if (currentTime - lastActivityTime >= LOGOUT_TIME) {
      alert("You have been logged out due to inactivity.");
      window.location.href = "/";
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const sideVisible = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    const activityInterval = setInterval(handleInactivity, 60000); // Check every minute

    // Reset the activity timer whenever the user interacts with the page
    document.addEventListener("mousemove", resetActivityTimer);
    document.addEventListener("keydown", resetActivityTimer);

    // Clean up event listeners and interval on component unmount
    return () => {
      clearInterval(activityInterval);
      document.removeEventListener("mousemove", resetActivityTimer);
      document.removeEventListener("keydown", resetActivityTimer);
    };
  }, [handleInactivity, lastActivityTime, resetActivityTimer]);

  // Update the filteredData whenever the searchTerm changes
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Function to make the API request
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://waitlist-5div.onrender.com/api/getWaitlist"
        );
        console.log(response.data);
        const sortedData = response.data.sort(
          (a: { timestamp: number }, b: { timestamp: number }) =>
            b.timestamp - a.timestamp
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

  // =====Function to delete an email=====
  const deleteEmail = async (email: string) => {
    try {
      console.log("before");
      const response = await axios.delete(
        `https://waitlist-api-production-0759.up.railway.app/api/deleteWaitlist/${email}`
      );
      console.log(response, "here");

      if (response.status === 200) {
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
    setConfirmationPopup(false);
  };

  // Function to download emails as a document
  const downloadEmails = () => {
    // Create a string containing the email addresses
    const emailList = data.map((item: EmailData) => item.Email).join("\n");

    // Convert the emailList string into a Blob
    const blob = new Blob([emailList], { type: "text/plain;charset=utf-8" });

    // Use saveAs to trigger the download
    saveAs(blob, "emails.txt");
  };

  const handleDeleteConfirmation = (email: string) => {
    setEmailToDelete(email);
    setConfirmationPopup(true);
  };

  const toggle = () => {
    setSidebarVisible(false);
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
        onClick={toggle}
      >
        {" "}
        <div className="flex justify-between">
          <h1 className="font-semibold md:text-[26px]">Waitlist Emails</h1>
          <Image
            onClick={downloadEmails}
            className="cursor-pointer w-auto h md:w-[35px] md:h-[35px] lg:w-[24px] lg:h-[24px]"
            src="/droplist.png"
            alt="download"
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

      <div onClick={toggle}>
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
              {filteredData.map((item: { Email: string }, index) => (
                <li
                  className="flex justify-between items-center border mb-[2%] mx-[5%] text-[12px] h-[33px] px-[2%] rounded-[5px] md:text-[16px] md:h-[45px] lg:mb-[5px]"
                  key={index}
                  onClick={toggle}
                >
                  <p className="text-[#0008]">{item.Email}</p>
                  <BiDotsVerticalRounded
                    className="text-lg"
                    onClick={() => handleDeleteConfirmation(item.Email)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {confirmationPopup && (
        <Modal>
          <div className="w-[300px] h-[219px] shadow-[#0005] bg-white rounded-[11px] md:rounded-[14px] md:w-[550px] md:h-[400px] lg:w-[40%] lg:h-[400px]">
            <hr className="mt-[10%] mb-[5%] h-[9px] bg-[#04177f] border-none md:h-[14px]" />
            <p className=" text-[12px] font-semibold text-center md:text-[18px]">
              Are you sure you want to delete this email ?
            </p>

            <div className="flex justify-center gap-[5%] mt-[25%]">
              <button
                onClick={() => deleteEmail(emailToDelete)}
                className="text-[10px] text-[#f95252] w-[95px] h-[22px] border-[1px] rounded-[7px] md:h-[30px] md:border-[2px] md:w-[120px] md:text-[14px]"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmationPopup(false)}
                className="text-[10px] text-white w-[95px] h-[22px] bg-[#04177f] rounded-[7px] md:w-[120px] md:h-[30px] md:text-[14px]"
              >
                Exit
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteSuccessPopUp && (
        <Modal>
          <div className="w-[300px] h-[219px] shadow-[#0005] bg-white rounded-[11px] md:rounded-[14px] md:w-[550px] md:h-[400px] lg:w-[40%] lg:h-[400px]">
            <hr className="mt-[10%] mb-[5%] h-[9px] bg-[#04177f] border-none md:h-[10px]" />
            <p className=" text-[12px] font-semibold text-center lg:text-[20px]">
              Successful
            </p>
            <p className=" text-[12px] font-semibold text-center lg:text-[18px]">
              Email has been deleted successfully
            </p>
            <Image
              className="mt-[2%] w-auto h-[50px] mx-auto lg:w-[80px] lg:h-[80px]"
              src="/Gif/checkMarkGif.gif"
              alt="/"
              width={50}
              height={50}
            />
            <div className="flex justify-center gap-[5%] mt-[12%]">
              <button
                onClick={() => setDeleteSuccessPopUp(false)}
                className="text-[10px] text-white w-[95px] h-[22px] bg-[#04177f] rounded-[7px] lg:w-[120px] lg:h-[30px] lg:text-[16px]"
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
