import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGauge,
  faUsersGear,
  faUserGraduate,
  faPersonBreastfeeding,
  faUserGear,
  faCalendarCheck,
  faPhone,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons"
//import Logo from "../../Images/webImages/believeLogo.png"
import ImageWithBlurhash from "../ImageWithBlurhash"
import { Routes, Route, Link, NavLink } from "react-router-dom"
import "./activeLinkStyles.css"
import noiseImage from "../../Images/webImages/noise.png"
function DashboardSide({ navToggle, setNavToggle, logOut }) {
  return (
    <>
      <aside
        className={` w-full transition-all duration-300 ${
          navToggle == false ? "-translate-x-full" : "translate-x-0"
        }  md:translate-x-0   md:w-[250px] fixed top-0 left-0 min-h-screen bg-purple-700 z-[30]`}
      >
        <div className="bg-noiseBg bg-repeat h-screen bg-opacity-40">
          <div className=" w-full p-2 px-4 flex items-center gap-2  border-opacity-5 ">
            <h1 className="text-white font-bold text-sm mt-[10px]  ">
              Umuhuza Monitoring <br /> system
            </h1>
          </div>
          <ul className=" flex flex-col gap-0  w-full  mt-8 text-[15px] font-semibold">
            <NavLink
              to="./dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6  "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faGauge}
                  className=" text-xl opacity-70  "
                />{" "}
                Dashboard
              </li>
            </NavLink>
            <NavLink
              to="./Report"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className=" text-xl   opacity-70 "
                />{" "}
                Report
              </li>
            </NavLink>
            <NavLink
              to="./students"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className=" text-xl  opacity-70  "
                />{" "}
                Students
              </li>
            </NavLink>
            <NavLink
              to="./parents"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faPersonBreastfeeding}
                  className=" text-xl  opacity-70  "
                />{" "}
                Parents
              </li>
            </NavLink>
            <NavLink
              to="./users"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUsersGear}
                  className=" text-xl  opacity-70  "
                />{" "}
                Users
              </li>
            </NavLink>

            <NavLink
              to="./profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUserGear}
                  className=" text-xl  opacity-70  "
                />{" "}
                Profile
              </li>
            </NavLink>
            <li
              className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6    "
              onClick={() => {
                logOut()
              }}
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                className=" text-xl  opacity-70  "
              />{" "}
              Log Out
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default DashboardSide
