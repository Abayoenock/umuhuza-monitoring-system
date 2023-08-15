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
import { AuthContext } from "../../ParentDashbard/DashboardParent"
import DotMin from "../../loaders/minDotLoader/DotMin"
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import ImageWithBlurhash from "../../ImageWithBlurhash"
import ParentInfo from "../Students/ParentInfo"
import ParentInfoParent from "./ParentInfoParent"

function ProfileParent({ myCallBack }) {
  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const userData = useContext(AuthContext)
  const { token } = userData

  const handleClick = () => {
    handleOpenModal()
  }

  const [isSubmit, setIsSubmit] = useState(false)
  const [isSubmitPassword, setIsSubmitPassword] = useState(false)
  const [serverResponse, setServerResponse] = useState([])
  const [serverResponsePassword, setServerResponsePassword] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef()

  const urlPassword = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=updatePassword`
  const {
    isLoading: isLoadingPassword,
    isError: isErrorPassord,
    data: passwordData,
    SubmitData: submitDataPassword,
  } = useSubmitData(urlPassword, token, setServerResponsePassword)

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

  const handleSubmitPassword = (event) => {
    event.preventDefault()
    setServerResponsePassword([])
    setIsSubmitPassword(true)
    const form = document.getElementById("passwordForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))

    submitDataPassword(formBody)
  }

  return (
    <>
      {/* {isError && <Navigate to="../admin" replace={true} />} */}
      <div className=" container mx-auto px-2 flex  relative w-full  mt-2 outline-4 pb-10">
        <button
          className=" absolute top-2 right-6 bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:translate-x-1 hover:bg-purple-600"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faKey} className="mr-2" /> Change password
        </button>
        <div className=" mt-[70px] w-full md:w-[90%] relative flex flex-col p-2 gap-4 justify-center items-center border-[1px] border-dotted border-purple-300 mb-20">
          <ParentInfoParent id={6} />
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
          className=" relative w-[80%] md:w-1/2  p-4 shadow-lg rounded-md border-[1px] border-purple-100 py-8 bg-white  backdrop-blur-sm "
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

export default ProfileParent
