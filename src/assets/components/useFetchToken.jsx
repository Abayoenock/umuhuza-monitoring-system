import { useState, useEffect } from "react"

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  // change state value
  const [data, setData] = useState(null)
  const [jwt, setJwt] = useState(null)
  useEffect(() => {
    const getJWT = () => {
      const accessToken = JSON.parse(localStorage.getItem("BelieveToken"))
      setJwt[accessToken]
    }
    getJWT
  }, [])
  useEffect(() => {
    // change name
    const fetchData = async () => {
      try {
        const resp = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + jwt.jwt,
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
      } catch (error) {
        setIsError(true)
        
      }
      // hide loading
      setIsLoading(false)
    }
    // invoke fetch data
    fetchData()
  }, [])

  return { isLoading, isError, data }
}

export default useFetch
