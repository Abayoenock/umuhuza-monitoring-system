import React, { useState, useRef, useContext, useEffect } from "react"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Routes, Route, Link, NavLink, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import {
  faImages,
  faTrashCan,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons"

import DotMin from "../../loaders/minDotLoader/DotMin"
import avatarImage from "../../../Images/webImages/avatar.webp"
import useFetch from "../../useFetch"
import ImageWithBlurhash from "../../ImageWithBlurhash"

function EditUser() {
  const { userID } = useParams()
  const { token } = useContext(AuthContext)
  const [usersData, setUsersData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef()
  const [checkInputBox, setCheckInputBox] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [inputValues, setInPutValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    category: "",
  })

  const checkRef = useRef(false)
  useEffect(() => {
    if (checkRef.current) {
      setInPutValues((current) => {
        return {
          ...current,
          firstName: usersData?.[0]?.firstName,
          lastName: usersData?.[0]?.lastName,
          email: usersData?.[0]?.email,
          phoneNumber: usersData?.[0]?.phoneNumber,
          category: usersData?.[0]?.role,
        }
      })
    }
    checkRef.current = true
  }, [usersData])
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInPutValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }

  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=users&userID=${userID}`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    fetchData(token, setUsersData)
    setIsDataLoading(false)
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
  }
  const handleReset = () => {
    setSelectedImage(null)
    fileInputRef.current.value = null
  }
  const handleSubmitData = (event) => {
    event.preventDefault()
    const form = document.getElementById("EditUserForm")
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    setIsSubmit(true)
    const SubmitData = async (formBody) => {
      try {
        const resp = await fetch(
          `${
            import.meta.env.VITE_REACT_API_URL
          }/api/requestData.php?t=updateUser&userID=${userID}`,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
            body: formBody,
          }
        )

        if (!resp.ok) {
          toast.error("An error occured, no server found", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          return
        }

        // change to response
        const response = await resp.json()

        if (response.success) {
          toast.success(response.messages, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        } else {
          toast.error(response.messages, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
      } catch (error) {
        toast.success(error, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      // setTimeout(() => {
      setIsSubmit(false)
      // }, 3000)
    }
    SubmitData(formData)
  }

  return (
    <>
      {isDataLoading ? (
        "Loading..."
      ) : (
        <div className="  px-6 p-4 w-full flex flex-col ">
          <div className="w-fit">
            <NavLink to="../">
              {" "}
              <button className=" bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:-translate-x-1 hover:bg-purple-600">
                {" "}
                <FontAwesomeIcon
                  icon={faAnglesLeft}
                  className="mr-2 animate-pulse "
                />
                Users
              </button>{" "}
            </NavLink>
          </div>

          <form
            action=""
            className="w-full   mt-8 self-center"
            id="EditUserForm"
            method="POST"
            encType="multipart/form-data"
            onSubmit={() => handleSubmitData(event)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex mb-4 w-fit  ">
                {!selectedImage && (
                  <label
                    htmlFor="image"
                    className=" cursor-pointer transition-all duration-300 hover:bg-purple-100 relative mr-2 w-[200px] h-[200px] border-[1px] border-dashed border-purple-200 flex items-center justify-center flex-col"
                  >
                    {" "}
                    <ImageWithBlurhash
                      imageUrl={
                        usersData?.[0]?.userProfileImage
                          ? usersData?.[0]?.userProfileImage
                          : avatarImage
                      }
                      altImage="Room image "
                      blurhash={"LEGbh.9h3Y^ZPXa1wHXQ?sxoIBNg"}
                      className=" w-full h-full object-cover aspect-square shadow-xl rounded-sm transition-all duration-300 hover:scale-105 cursor-pointer "
                      parentClassName="w-full   h-full min-h-[150px] self-start justify-self-start "
                    />
                    <p className=" text-xs p-4 w-full  text-white absolute  bottom-0  left-0  bg-purple-500 bg-opacity-50 backdrop-blur-sm h-fit transition-all duration-300 group-hover:-translate-y-[100%]  ">
                      Click to select image
                    </p>
                  </label>
                )}

                {selectedImage && (
                  <div className=" relative w-[200px] h-fit border-[1px] border-dashed border-purple-200 p-4 py-2">
                    <div className=" w-full">
                      <h2 className="text-sm font-semibold mb-2 text-gray-500">
                        Image Preview:
                      </h2>
                      <ImageWithBlurhashModal
                        imageUrl={selectedImage}
                        altImage="selected image preview "
                        blurhash={"LEGbh.9h3Y^ZPXa1wHXQ?sxoIBNg"}
                        className=" w-full h-full object-cover aspect-square shadow-xl rounded-md transition-all duration-300 hover:scale-105 cursor-pointer "
                        parentClassName="w-full   h-full min-h-[150px]"
                      />
                    </div>

                    <div className="flex mt-4">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        title="Remove"
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="border border-gray-300 px-2 py-1 hidden"
                  ref={fileInputRef}
                  name="driverImage"
                />
              </div>
              <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row">
                  <div className=" w-full  grid grid-cols-2 gap-x-8 gap-y-3 px-4">
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={inputValues.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        first name
                      </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={inputValues.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lastname
                      </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={inputValues.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone number
                      </label>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        placeholder=" "
                        value={inputValues.email}
                        onChange={handleInputChange}
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        email
                      </label>
                    </div>

                    <div className="relative z-0 mb-6 w-full flex group items-end ">
                      <select
                        className="block w-full text-gray-500   px-0  text-sm  bg-transparent border-b-2 pb-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                        id=""
                        name="category"
                        onChange={handleInputChange}
                      >
                        {" "}
                        <option value={inputValues.category}>
                          {inputValues.category == 0 ? "Admin" : "viewer"}
                        </option>
                        <option value="">Choose Category</option>
                        <option value="A">Admin</option>
                        <option value="B">Viewer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                disabled={isSubmit}
                className={`  text-white transition-all duration-300 ${
                  !isSubmit
                    ? "bg-purple-700 hover:bg-purple-800"
                    : "bg-purple-500 cursor-wait "
                }  focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center  `}
              >
                {!isSubmit ? (
                  "Save"
                ) : (
                  <div className="flex items-center justify-center gap-1 h-full ">
                    {" "}
                    <span>Saving </span> <DotMin />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default EditUser
