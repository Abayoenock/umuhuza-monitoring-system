import { useEffect, useState } from "react"
import { json } from "react-router-dom"
const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  // change state value
  const [data, setData] = useState(null)
  const fetchData = async (jwtToken, state) => {
    setIsLoading(true)
    setIsError(false)
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwtToken,
          "content-type": "application/json",
        },
      })

      if (!resp.ok) {
        setIsError(true)
        setIsLoading(false)
        return
      }
      // change to response
      const response = await resp.json()
    

      setData(response)
      state(() => {
        return response
      })
    } catch (error) {
      setIsError(true)
    }
    // hide loading
    setIsLoading(false)
  }

  return { isLoading, isError, data, fetchData }
}

export default useFetch
