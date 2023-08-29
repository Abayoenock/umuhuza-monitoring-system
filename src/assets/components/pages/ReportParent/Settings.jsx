import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../ParentDashbard/DashboardParent"
import useFetch from "../../useFetch"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
function Settings({ handleCloseDialog }) {
  const [always, setAlways] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [settings, setSettings] = useState([])
  const { token } = useContext(AuthContext)
  const [inputValues, setInputValues] = useState({ inTime: "", outTime: "" })
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=settings`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setSettings)
    setIsDataLoading(false)
  }, [])

  useEffect(() => {
    setAlways(
      settings?.[0]?.sms ? (settings?.[0]?.sms == 1 ? true : false) : false
    )
    setInputValues({
      inTime: settings?.[0]?.inTime,
      outTime: settings?.[0]?.outTime,
    })
  }, [settings])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }

  const [serverResponse, setServerResponse] = useState([])
  const urlSubmit = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=updateSettings`

  const [isSubmit, setIsSubmit] = useState(false)
  const {
    isLoading: isLoadingSubmit,
    isError: isErrorSubmit,
    data: dataSubmit,
    SubmitData,
  } = useSubmitData(urlSubmit, token, setServerResponse)

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (serverResponse?.success == false) {
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
      if (serverResponse.success === true) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        return
      }
    }
    updateResponse()
  }, [serverResponse])
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("settingsForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))

    SubmitData(formBody)
  }
  return (
    <div className=" min-w-[450px]">
      <form method="POST" onSubmit={handleSubmit} id="settingsForm">
        <div className="w-full  grid grid-cols-2 gap-4 gap-x-8 ">
          <div className=" col-span-2">
            <div className=" flex gap-2">
              <p className="text-xs">Send SMS </p>
              <input
                type="checkbox"
                name="sms"
                id="always"
                checked={always}
                onChange={() => setAlways(!always)}
              />
            </div>
          </div>
          <div className="w-full py-2">
            <div className="relative z-0 w-full group">
              <input
                type="time"
                name="inTime"
                id="inTime"
                value={inputValues.inTime}
                className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                disabled={!always}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="inTime"
                value={inputValues.inTime}
                className=" hidden py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="inTime"
                className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
              >
                Max inTime
              </label>
            </div>
          </div>
          <div className="w-full py-2">
            <div className="relative z-0 w-full group">
              <input
                type="time"
                name="outTime"
                id="outTime"
                className="block py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                value={inputValues.outTime}
                disabled={!always}
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="outTime"
                className="hidden py-2 px-0 w-full text-[12px] text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                placeholder=" "
                value={inputValues.outTime}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="outTime"
                className="absolute text-xs text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[20px]"
              >
                Max outTime
              </label>
            </div>
          </div>
          <div className=" col-span-2 flex justify-end">
            <button
              type="reset"
              onClick={handleCloseDialog}
              className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
            >
              Close
            </button>
            <button
              type="submit"
              className="border-none bg-purple-500 text-white p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-purple-600 mr-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Settings
