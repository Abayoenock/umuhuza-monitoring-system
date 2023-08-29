import { useState, useEffect } from "react"

const useSubmitData = (url, token, setServerResponse) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  // change state value
  const [data, setData] = useState([])
  useEffect(() => {
    setServerResponse(data[0])
  }, [data])
  //     // change name
  const accessToken = token
  const SubmitData = async (formBody) => {
    setIsLoading(true)
    setIsError(false)
    setData([])

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "content-type": "application/json",
        },
        body: formBody,
      })

      if (!resp.ok) {
        setIsError(true)
        setIsLoading(false)
        return
      }
      // change to response
      const response = await resp.json()

      setData((current) => {
        return [...current, response]
      })
    } catch (error) {
      setIsError(true)
    }
    // hide loading
    setIsLoading(false)
  }

  return { isLoading, isError, data, SubmitData }
}

export default useSubmitData
