import React, { useEffect, useRef, useState } from "react"
import Select from "react-select"
import useFetch from "../useFetch"

function SectorSelect({ province, district, setSector, Defaultsector }) {
  const [resetKey, setResetKey] = useState(0)
  const [sectorData, setSectorData] = useState([
    {
      value: Defaultsector,
      label: Defaultsector == "" ? "Select Sector" : Defaultsector,
    },
  ])
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/RwandaData.php?t=S&province=${province}&district=${district}`
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const selectRef = useRef(null)
  useEffect(() => {
    handleResetSelect()
    fetchData("", setSectorData)
  }, [district])
  const handleResetSelect = () => {
    if (selectRef) {
      setSector("")
      setResetKey((prevKey) => prevKey + 1)
    }
  }
  return (
    <div className="flex flex-col text-[12px]  gap-2">
      <label htmlFor="province">Sector</label>
      <Select
        key={resetKey}
        ref={selectRef}
        className="basic-single focus:border-purple-300"
        classNamePrefix="select"
        defaultValue={sectorData[0]}
        isDisabled={
          Defaultsector.length > 0 ? false : district == "" ? true : false
        }
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="sector"
        options={sectorData}
        onChange={(selected) => {
          setSector(selected.value)
        }}
      />
    </div>
  )
}

export default SectorSelect
