import React, { useContext, useEffect, useState } from "react"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import contactImage from "../../../Images/webImages/contactImage.png"
import useFetch from "../../useFetch"
import DotMin from "../../loaders/minDotLoader/DotMin"
import { Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"

function Contacts() {
  const [contacts, setContacts] = useState({
    email1: " ",
    email2: " ",
    phone1: " ",
    phone2: " ",
    facebook: " ",
    twitter: " ",
    instagram: " ",
  })

  const urlContacts = "http://127.0.0.1/beleiveBackend/api/contacts.php"
  const {
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
    data: contactsData,
    fetchData,
  } = useFetch(urlContacts)

  useEffect(() => {
    fetchData("", setContacts)
  }, [])
  const [isSubmit, setIsSubmit] = useState(false)
  const { token } = useContext(AuthContext)
  const [serverResponse, setServerResponse] = useState([])
  const url =
    "http://127.0.0.1/beleiveBackend/api/requestData.php?t=updateContacts"
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    token,
    setServerResponse
  )

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
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("contactForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))

    SubmitData(formBody)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setContacts((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }
  return (
    <>
      {isErrorContacts && <Navigate to="../admin" replace={true} />}
      {isLoadingContacts && (
        <div className="flex w-full min-h-screen justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoadingContacts && (
        <div className="flex  relative w-full outline-4  justify-center h-[calc(100vh-80px)]  mt-[80px]">
          <div className="w-[90%] relative flex justify-center items-center">
            <img
              src={contactImage}
              alt=""
              className="absolute  w-[40%] -z-1 -right-8 top-0 hidden md:block drop-shadow-md"
            />
            <form
              method="post"
              id="contactForm"
              onSubmit={() => handleSubmit(event)}
              className=" w-full md:w-[70%] grid grid-cols-1  md:grid-cols-2 gap-x-4   p-4 shadow-lg rounded-md border-[1px] border-blue-100 py-8 bg-white bg-opacity-60 backdrop-blur-sm"
            >
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="email1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.email1}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="email_address"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="email"
                  name="email2"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.email2}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="email_address1"
                  className="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="tel"
                  name="phone1"
                  id="phone_1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.phone1}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="phone_1"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number (+250.....)
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="tel"
                  name="phone2"
                  id="phone_2"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.phone2}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="phone_2"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Phone number (+250....)
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="url"
                  name="facebook"
                  id="facebook"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.facebook}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="facebook"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Facebook page url
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="url"
                  name="instagram"
                  id="instagram"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.instagram}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="instagram"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Instagram page url
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="url"
                  name="twitter"
                  id="twitter"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contacts.twitter}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="twitter"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Twitter page url
                </label>
              </div>

              <div className="w-full  flex justify-center items-center ">
                <button
                  type="submit"
                  disabled={isSubmit}
                  className={`  text-white transition-all duration-300 ${
                    !isSubmit
                      ? "bg-blue-700 hover:bg-blue-800"
                      : "bg-blue-500 cursor-wait "
                  }  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center  `}
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
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Contacts
