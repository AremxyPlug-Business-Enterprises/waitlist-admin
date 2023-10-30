import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import axios from "axios";
import { Loader } from "../app/Loader/Loader";

type Props = {};

const Dashboard = (props: Props) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setData(response.data);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError("Network Error");
        setLoading(false);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchData();
  }, []);

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
            className="w-auto h-[20px] md:w-[35px] md:h-[35px] lg:w-[24px] lg:h-[24px]"
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
            className="bg-transparent w-[100%] md:text-[20px]"
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
                  <BiDotsVerticalRounded className="text-lg" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
