import React, { useState, useEffect } from "react"
const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000) // Update the time every second

    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return date.toLocaleDateString(undefined, options)
  }

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }
    return date.toLocaleTimeString(undefined, options)
  }

  return (
    <div className="w-full bg-noiseBg  shadow-lg rounded-md border-[1px] border-blue-100 p-2 px-4 relative bg-white  bg-opacity-50 transition-all duration-300 hover:scale-105 cursor-pointer">
      <p className="text-[10px] font-semibold">{formatDate(currentDateTime)}</p>
      <p className="text-xl font-semibold">{formatTime(currentDateTime)}</p>
    </div>
  )
}

export default CurrentDateTime
