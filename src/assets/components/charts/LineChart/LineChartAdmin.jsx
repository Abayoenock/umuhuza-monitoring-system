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
      text: "Student attandance statistics",
    },
  },
}

export function LineChartAdmin({ year, month, reFetch = true }) {
  const [attandanceData, setAttandanceData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=adminGraph&year=${year}&month=${month}`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setAttandanceData)
    if (reFetch) {
      const intID = setInterval(() => {
        fetchData(token, setAttandanceData)
      }, 2000)
      return () => {
        clearInterval(intID)
      }
    }
  }, [year, month])

  //   useEffect(() => {
  //     console.log(attandanceData)
  //   }, [attandanceData])

  const labels = attandanceData.map((data) => data.label)
  const dataChart = {
    labels,
    datasets: [
      {
        label: "students Attendance",
        data: attandanceData.map((data) => data.attended),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  }

  return (
    <>
      <Line options={options} data={dataChart} />
    </>
  )
}
