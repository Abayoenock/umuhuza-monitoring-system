import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../ParentDashbard/DashboardParent"
import useFetch from "../../useFetch"
import CurrentDateTime from "./CurrentDateTime"
import LottiePlayer from "../../lottiePlayer/LottiePlayer"

import studentAnimation from "../../../Lotties/student.json"

function DashboardStats() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)
  const [summary, setSummary] = useState({})
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=summary`
  const { isLoading, isError, data: summaryData, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setSummary)
  }, [])

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 ">
      <CurrentDateTime />

      <div className=" bg-noiseBg w-full shadow-lg rounded-md border-[1px] border-blue-100 p-3 px-4 relative text-white bg-purple-600  bg-opacity-70 transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="">
          <h2 className="font-semibold ">Students</h2>

          <p className="text-lg  font-bold">{summary?.students}&nbsp;</p>
        </div>
        <div className="w-[60px] absolute top-1/2 -translate-y-1/2  rounded-md right-2 bg-white p-2">
          <LottiePlayer src={studentAnimation} />
        </div>
      </div>
    </div>
  )
}

export default DashboardStats
