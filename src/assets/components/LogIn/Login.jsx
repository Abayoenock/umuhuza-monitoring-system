import React, { useState } from "react"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import phoneAnimation from "../../Lotties/sms.json"
import fingerPrint from "../../Lotties/FingerprintWhite.json"
import registerForm from "../../Lotties/register.json"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"

import ForgotPassword from "./ForgotPassword"
import BackImage from "../../Images/webImages/backImage.jpg"
function Login() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className=" w-screen  bg-red-500 overflow-x-hidden ">
      <div className="bg-white w-full ">
        <div className="flex w-full  h-screen overflow-y-hidden">
          <div className="hidden bg-cover lg:block lg:w-[55%] relative">
            <div className=" w-full h-full absolute bottom-0 left-0  ">
              <img
                src={BackImage}
                className="w-full h-full object-cover "
                alt=""
              />
            </div>

            <div className=" relative flex flex-col h-full px-20 bg-purple-800 backdrop-blur-[1px] bg-opacity-90">
              <div className="mt-12">
                <h2 className="text-4xl font-bold text-center text-white  ">
                  Umuhuza monitoring system
                </h2>
              </div>

              <div className=" self-center justify-self-center  mt-[60px]">
                <ul className="text-white flex flex-col gap-6 relative before:absolute before:w-[1px] before:h-full before:border-dotted before:border-l-[3px] before:-top-2 before:left-[11px] before:-z-1 ">
                  <li className=" flex flex-col gap-3">
                    {" "}
                    <div className=" flex gap-3 items-center">
                      <div className=" w-[25px] h-[25px] rounded-full bg-white text-purple-800 flex justify-center items-center text-sm font-bold backdrop-blur-[2px] ">
                        1
                      </div>{" "}
                      <span className="font-semibold"> Register Accounts</span>{" "}
                    </div>
                    <div className="flex gap-2 ml-[50px] items-center">
                      <div className="w-[70px] ">
                        <LottiePlayer src={registerForm} />
                      </div>
                      <p className="text-xs  w-[60%]">
                        To start using the system, request both your and your
                        child account to be registered into the system{" "}
                      </p>
                    </div>
                  </li>
                  <li className=" flex flex-col gap-3">
                    {" "}
                    <div className=" flex gap-3 items-center">
                      <div className=" w-[25px] h-[25px] rounded-full bg-white text-purple-800 flex justify-center items-center text-sm font-bold ">
                        2
                      </div>{" "}
                      <span className="font-semibold">
                        Student verification on entry & exit
                      </span>{" "}
                    </div>
                    <div className=" flex gap-2 ml-[50px] items-center">
                      <div className="w-[70px] ">
                        <LottiePlayer src={fingerPrint} />
                      </div>
                      <p className="text-xs  w-[60%]">
                        Student must place a finger print sensor on the entry
                        and exit of the school{" "}
                      </p>
                    </div>
                  </li>
                  <li className=" flex flex-col gap-3">
                    {" "}
                    <div className=" flex gap-3 items-center">
                      <div className=" w-[25px] h-[25px] rounded-full bg-white text-purple-800 flex justify-center items-center text-sm font-bold ">
                        3
                      </div>{" "}
                      <span className="font-semibold">
                        Get SMS notifications
                      </span>{" "}
                    </div>
                    <div className=" flex gap-2 ml-[50px] items-center">
                      <div className="w-[70px] ">
                        <LottiePlayer src={phoneAnimation} />
                      </div>
                      <p className="text-xs  w-[60%] ">
                        Student must place a finger on the finger print sensor
                        on the entry and exit of the school{" "}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <ul className="absolute top-1/2 right-0 flex flex-col  font-semibold w-[100px]">
                <li
                  className={` w-full h-full p-3  px-4  transition-all duration-300 ${
                    activeTab == 0
                      ? "bg-white"
                      : "text-white hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-sm"
                  }   cursor-pointer   `}
                  onClick={() => setActiveTab(0)}
                >
                  Gurdians
                </li>
                <li
                  className={` w-full h-full p-3  px-4 transition-all duration-300 ${
                    activeTab == 1
                      ? "bg-white"
                      : "text-white hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-sm"
                  }   cursor-pointer   `}
                  onClick={() => setActiveTab(1)}
                >
                  School
                </li>
              </ul>

              <ul className="circles ">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6  lg:w-[45%] overflow-y-hidden ">
            {/* login form */}
            <Routes>
              <Route path="/" element={<LoginForm activeTab={activeTab} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
