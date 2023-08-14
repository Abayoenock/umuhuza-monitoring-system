import React, { useContext, useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Fuel reminder statistics",
    },
  },
}

export function LiveLineChart({ deviceID, date, reFetch = false }) {
  const [vehicleData, setVehicleData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=chartData&device=${deviceID}&date=${date}`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setVehicleData)
    if (reFetch) {
      const intID = setInterval(() => {
        fetchData(token, setVehicleData)
      }, 1000)
      return () => {
        clearInterval(intID)
      }
    }
  }, [deviceID, date])

  useEffect(() => {
    console.log(vehicleData)
  }, [vehicleData])

  const labels = vehicleData?.labels
  const dataChart = {
    labels,
    datasets: [
      {
        label: "Fuel %",
        data: vehicleData?.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  }

  return <Line options={options} data={dataChart} />
}
