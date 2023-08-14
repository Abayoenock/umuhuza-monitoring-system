import React, { useContext, useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import ImageAvatar from "../../Images/webImages/avatar.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../AdminDashbard/Dashboard"
function DashboardHeader({ navToggle, setNavToggle, logOut }) {
  const userProfileData = useContext(AuthContext)
  const [avatarMenu, setAvatarMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#navLinks") && avatarMenu == true) {
        setAvatarMenu(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header
        className={`flex transition-all duration-300     ${
          navToggle == false
            ? " bg-white bg-opacity-80 shadow-sm backdrop-blur-sm z-[90]"
            : " bg-transparent z-[33] "
        }  w-full  justify-between  md:justify-end p-2 px-8 items-center gap-2 md:z-[30] fixed top-[0px]  `}
      >
        <div
          className={`flex gap-x-4 flex-row-reverse md:flex-row items-center transition-all duration-500 ease-out ${
            navToggle == false ? "flex" : "hidden"
          }`}
        >
          <p className="text-sm font-semibold ">
            <span className="text-purple-600 ">Hello</span> ,{" "}
            {userProfileData.firstName} {userProfileData.lastName}
          </p>
          <div className="relative">
            <Avatar
              alt={userProfileData.firstName}
              src={
                userProfileData?.profile
                  ? userProfileData?.profile
                  : ImageAvatar
              }
              sx={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="z-[100] flex items-center ">
          <input
            type="checkbox"
            id="menu"
            checked={navToggle}
            onChange={() => {
              setNavToggle(() => {
                return !navToggle
              })
            }}
          />
          <label htmlFor="menu" className="icon icon2 md:hidden   ">
            <div className="menu"></div>
          </label>
        </div>
      </header>
    </>
  )
}

export default DashboardHeader
