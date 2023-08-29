import React, { useContext, useEffect, useRef, useState } from "react"
import Modal from "@mui/material/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faXmark,
  faKey,
  faImages,
  faTrashCan,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons"
import avatarImage from "../../../Images/webImages/avatar.webp"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import DotMin from "../../loaders/minDotLoader/DotMin"
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import ImageWithBlurhash from "../../ImageWithBlurhash"

function UserProfile({ myCallBack }) {
  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const userData = useContext(AuthContext)
  const { token } = userData
  const [inputValues, setInPutValues] = useState(userData)
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInPutValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }
  const handleClick = () => {
    handleOpenModal()
  }

  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitPassword, setIsSubmitPassword] = useState(false)
  const [serverResponse, setServerResponse] = useState([])
  const [serverResponsePassword, setServerResponsePassword] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef()
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=updateProfile`
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    token,
    setServerResponse
  )
  const urlPassword = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=updatePassword`
  const {
    isLoading: isLoadingPassword,
    isError: isErrorPassord,
    data: passwordData,
    SubmitData: submitDataPassword,
  } = useSubmitData(urlPassword, token, setServerResponsePassword)

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (!serverResponse?.success) {
        toast.error(serverResponse?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)

        // myCallBack()

        return
      }
      if (serverResponse?.success) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)
        return
      }
    }
    updateResponse()
  }, [serverResponse])

  useEffect(() => {
    const updateResponse = () => {
      setServerResponsePassword(serverResponsePassword)
      if (!serverResponsePassword?.success) {
        toast.error(serverResponsePassword?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        handleCloseModal()
        setIsSubmitPassword(false)

        return
      }
      if (serverResponsePassword?.success) {
        toast.success(serverResponsePassword?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmitPassword(false)
        return
      }
    }
    updateResponse()
  }, [serverResponsePassword])

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = document.getElementById("profileForm")
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    setIsSubmit(true)
    const SubmitData = async (formBody) => {
      try {
        const resp = await fetch(
          `${
            import.meta.env.VITE_REACT_API_URL
          }/api/requestData.php?t=updateProfile`,
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

  const handleSubmitPassword = (event) => {
    event.preventDefault()
    setServerResponsePassword([])
    setIsSubmitPassword(true)
    const form = document.getElementById("passwordForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))

    submitDataPassword(formBody)
  }
  const handleReset = () => {
    setSelectedImage(null)
    fileInputRef.current.value = null
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
  }
  return (
    <>
      {/* {isError && <Navigate to="../admin" replace={true} />} */}
      <div className=" container mx-auto px-2 flex  relative w-full  mt-2 outline-4">
        <button
          className=" absolute top-2 right-6 bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:translate-x-1 hover:bg-purple-600"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faKey} className="mr-2" /> Change password
        </button>
        <div className=" mt-[70px] w-full md:w-[90%] relative flex flex-col p-2 gap-4 justify-center items-center border-[1px] border-dotted border-purple-300">
          <div className="   p-2 bg-purple-200 w-full font-semibold text-[13px]">
            Your profile Information
          </div>
          <form
            method="post"
            id="profileForm"
            onSubmit={handleSubmit}
            className=" w-full flex flex-col md:flex-row  gap-x-8 gap-y-6  p-2 pt-2   py-8 bg-white bg-opacity-60 "
          >
            <div className="w-fit ">
              <div className="flex mb-4 w-fit  ">
                {!selectedImage && (
                  <label
                    htmlFor="image"
                    className=" cursor-pointer transition-all duration-300 hover:bg-purple-100 relative mr-2 w-[200px] h-[200px] border-[1px] border-dashed border-purple-200 flex items-center justify-center flex-col"
                  >
                    {" "}
                    <ImageWithBlurhash
                      imageUrl={
                        inputValues.profile ? inputValues.profile : avatarImage
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
            </div>
            <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="firstName"
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
                  Firstname
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
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
                  type="email"
                  name="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=" "
                  value={inputValues.email}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="email_address"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                  placeholder=" "
                  value={inputValues.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number
                </label>
              </div>

              <div className="w-full flex justify-end col-span-2 ">
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
                    "Update"
                  ) : (
                    <div className="flex items-center justify-center gap-1 h-full ">
                      {" "}
                      <span>Updating </span> <DotMin />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: "rgba(37,99,235,0.5)",
          backdropFilter: "blur(2px)",
          outline: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:focus": {
            outline: "none",
            border: "none",
          },
        }}
      >
        <form
          method="post"
          id="passwordForm"
          onSubmit={handleSubmitPassword}
          className=" relative w-[80%] md:w-1/2  p-4 shadow-lg rounded-md border-[1px] border-purple-100 py-8 bg-white   "
        >
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleCloseModal}
            title="Close"
            className=" cursor-pointer p-2 absolute -right-3 -top-3 aspect-square bg-red-600 text-white text-[22px] font-extrabold  rounded-full transition-all duration-300 hover:bg-red-800 shadow-md  hover:origin-center hover:rotate-[360deg]  "
          />
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="currentPassword"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Current Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="newPassword"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm New password
            </label>
          </div>

          <div className="w-full flex justify-end ">
            <button
              type="submit"
              className="  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center d"
            >
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default UserProfile
