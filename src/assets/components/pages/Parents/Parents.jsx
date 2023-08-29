import React, { useState, useRef, useContext } from "react"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Routes, Route, Link, NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import {
  faImages,
  faTrashCan,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons"

import DotMin from "../../loaders/minDotLoader/DotMin"
import RwandaSelect from "../../RwandaSelect/RwandaSelect"
function Parents() {
  const { token } = useContext(AuthContext)

  const [selectedImageF, setSelectedImageF] = useState(null)
  const fileInputRefF = useRef()
  const [selectedImageM, setSelectedImageM] = useState(null)
  const fileInputRefM = useRef()
  const [selectedImageG, setSelectedImageG] = useState(null)
  const [selectKey, setSelectedKey] = useState(0)
  const fileInputRefG = useRef()

  const [checkInputBox, setCheckInputBox] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const handleImageChangeF = (event) => {
    const file = event.target.files[0]
    setSelectedImageF(URL.createObjectURL(file))
  }
  const handleResetF = () => {
    setSelectedImageF(null)
    fileInputRefF.current.value = null
  }
  const handleImageChangeM = (event) => {
    const file = event.target.files[0]
    setSelectedImageM(URL.createObjectURL(file))
  }
  const handleResetM = () => {
    setSelectedImageM(null)
    fileInputRefM.current.value = null
  }
  const handleImageChangeG = (event) => {
    const file = event.target.files[0]
    setSelectedImageG(URL.createObjectURL(file))
  }
  const handleResetG = () => {
    setSelectedImageG(null)
    fileInputRefG.current.value = null
  }

  const handleSubmitData = (event) => {
    event.preventDefault()

    const form = document.getElementById("newDriverForm")
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    setIsSubmit(true)
    const SubmitData = async (formBody) => {
      try {
        const resp = await fetch(
          `${
            import.meta.env.VITE_REACT_API_URL
          }/api/requestData.php?t=registerParent`,
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
          form.reset()
          handleResetF()
          handleResetM()
          handleResetG()
          setSelectedKey((prev) => prev + 1)
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
    <div className="  px-6 p-4 w-full flex flex-col ">
      <NavLink to="../">
        {" "}
        <button className=" bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:-translate-x-1 hover:bg-purple-600">
          {" "}
          <FontAwesomeIcon
            icon={faAnglesLeft}
            className="mr-2 animate-pulse "
          />
          Parents
        </button>{" "}
      </NavLink>
      <form
        action=""
        className="w-full   mt-8 self-center border-[1px] border-purple-500 border-dotted  p-3"
        id="newDriverForm"
        method="POST"
        encType="multipart/form-data"
        onSubmit={() => handleSubmitData(event)}
      >
        <div className="p-2 bg-purple-200 w-full font-semibold text-[13px]">
          Parent Information
        </div>
        <div className=" mt-2  flex flex-col md:flex-row gap-3 w-full">
          <div className="  wfull md:w-1/2 flex flex-col  gap-1">
            <div className="p-2 bg-purple-50 border-[1px] border-purple-300 border-dashed w-full font-semibold text-[12px]">
              Father's Info
            </div>
            <div className="w-full flex gap-3 items-start">
              {/* the container for the select image  */}
              <div className="w-fit ">
                <div className="flex mb-4 w-fit  ">
                  {!selectedImageF && (
                    <label
                      htmlFor="Fatherimage"
                      className=" cursor-pointer transition-all duration-300 hover:bg-purple-100 relative mr-2 w-[150px] h-[150px] border-[1px] border-dashed border-purple-200 flex items-center justify-center flex-col"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faImages}
                        className=" text-[50px]  opacity-70  "
                      />
                      <p className="text-xs  text-gray-400 absolute bottom-2 ">
                        Click to select image
                      </p>
                    </label>
                  )}

                  {selectedImageF && (
                    <div className=" relative w-[150px] h-fit border-[1px] border-dashed border-purple-200 p-4 py-2">
                      <div className=" w-full">
                        <h2 className="text-sm font-semibold mb-2 text-gray-500">
                          Image Preview:
                        </h2>
                        <ImageWithBlurhashModal
                          imageUrl={selectedImageF}
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
                          onClick={handleResetF}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded  cursor-pointer text-xs"
                        />
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    id="Fatherimage"
                    onChange={handleImageChangeF}
                    className="border border-gray-300 px-2 py-1 hidden"
                    ref={fileInputRefF}
                    name="fatherImage"
                  />
                </div>
              </div>
              {/* the conatiner for fathers input  */}
              <div className="w-full pt-2">
                <div className=" w-full  grid grid-cols-1 gap-x-8 gap-y-4 px-4">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="fathersName"
                      id="fathersName"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="fathersName"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Names
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input
                      type="tel"
                      name="FphoneNumber"
                      id="FphoneNumber"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="FphoneNumber"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Phone number
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="FNID"
                      id="FNID"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="FNID"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      NID
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col  gap-1">
            <div className="p-2 bg-purple-50 border-[1px] border-purple-300 border-dashed w-full font-semibold text-[12px]">
              Mother's Info
            </div>
            <div className="w-full flex gap-3 items-start">
              {/* the container for the select image  */}
              <div className="w-fit ">
                <div className="flex mb-4 w-fit  ">
                  {!selectedImageM && (
                    <label
                      htmlFor="motherImage"
                      className=" cursor-pointer transition-all duration-300 hover:bg-purple-100 relative mr-2 w-[150px] h-[150px] border-[1px] border-dashed border-purple-200 flex items-center justify-center flex-col"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faImages}
                        className=" text-[50px]  opacity-70  "
                      />
                      <p className="text-xs  text-gray-400 absolute bottom-2 ">
                        Click to select image
                      </p>
                    </label>
                  )}

                  {selectedImageM && (
                    <div className=" relative w-[150px] h-fit border-[1px] border-dashed border-purple-200 p-4 py-2">
                      <div className=" w-full">
                        <h2 className="text-sm font-semibold mb-2 text-gray-500">
                          Image Preview:
                        </h2>
                        <ImageWithBlurhashModal
                          imageUrl={selectedImageM}
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
                          onClick={handleResetM}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded  cursor-pointer text-xs"
                        />
                      </div>
                    </div>
                  )}

                  <input
                    type="file"
                    id="motherImage"
                    onChange={handleImageChangeM}
                    className="border border-gray-300 px-2 py-1 hidden"
                    ref={fileInputRefM}
                    name="motherImage"
                  />
                </div>
              </div>
              {/* the conatiner for fathers input  */}
              <div className="w-full pt-2">
                <div className=" w-full  grid grid-cols-1 gap-x-8 gap-y-4 px-4">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="mothersName"
                      id="mothersName"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="mothersName"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Names
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input
                      type="tel"
                      name="MphoneNumber"
                      id="MphoneNumber"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="MphoneNumber"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      Phone number
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="MNID"
                      id="MNID"
                      className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="MNID"
                      className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                    >
                      NID
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="w-full">
            <div className="p-2 bg-purple-200 w-full font-semibold text-[13px]">
              Guardian Account info
            </div>
            <div className=" w-full mt-2">
              <div className="w-full flex flex-col  gap-1">
                <div className="w-full flex gap-3 items-start">
                  {/* the container for the select image  */}
                  <div className="w-fit ">
                    <div className="flex mb-4 w-fit  ">
                      {!selectedImageG && (
                        <label
                          htmlFor="guardianImage"
                          className=" cursor-pointer transition-all duration-300 hover:bg-purple-100 relative mr-2 w-[150px] h-[150px] border-[1px] border-dashed border-purple-200 flex items-center justify-center flex-col"
                        >
                          {" "}
                          <FontAwesomeIcon
                            icon={faImages}
                            className=" text-[50px]  opacity-70  "
                          />
                          <p className="text-xs  text-gray-400 absolute bottom-2 ">
                            Click to select image
                          </p>
                        </label>
                      )}

                      {selectedImageG && (
                        <div className=" relative w-[150px] h-fit border-[1px] border-dashed border-purple-200 p-4 py-2">
                          <div className=" w-full">
                            <h2 className="text-sm font-semibold mb-2 text-gray-500">
                              Image Preview:
                            </h2>
                            <ImageWithBlurhashModal
                              imageUrl={selectedImageG}
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
                              onClick={handleResetG}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded  cursor-pointer text-xs"
                            />
                          </div>
                        </div>
                      )}

                      <input
                        type="file"
                        id="guardianImage"
                        onChange={handleImageChangeG}
                        className="border border-gray-300 px-2 py-1 hidden"
                        ref={fileInputRefG}
                        name="guardianImage"
                      />
                    </div>
                  </div>
                  {/* the conatiner for fathers input  */}
                  <div className="w-full pt-2">
                    <div className=" w-full  grid grid-cols-1 gap-x-8 gap-y-4 px-4">
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="firstName"
                          className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                        >
                          First name
                        </label>
                      </div>
                      <div className="relative z-0 w-full group">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="lastName"
                          className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                        >
                          Lastname
                        </label>
                      </div>

                      <div className="relative z-0 w-full group">
                        <input
                          type="tel"
                          name="GphoneNumber"
                          id="GphoneNumber"
                          className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="GphoneNumber"
                          className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                        >
                          Phone number
                        </label>
                      </div>

                      <div className="relative z-0 w-full group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="email"
                          className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <div className="p-2 bg-purple-200 w-full font-semibold text-[13px]">
              Address info
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
              {/* select box */}
              <RwandaSelect key={selectKey} />
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
  )
}

export default Parents
