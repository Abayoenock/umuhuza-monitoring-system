import React, { useEffect, useRef, useState } from "react"
import Select from "react-select"
import useFetch from "../useFetch"

function DistrictSelect({ province, setDistrict, Defaultdistrict }) {
  const [resetKey, setResetKey] = useState(0)
  const [districtsData, setDistrictsData] = useState([
    {
      value: Defaultdistrict,
      label: Defaultdistrict == "" ? "Select District" : Defaultdistrict,
    },
  ])
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/RwandaData.php?t=D&province=${province}`
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const selectRef = useRef(null)
  useEffect(() => {
    handleResetSelect()
    fetchData("", setDistrictsData)
  }, [province])
  const handleResetSelect = () => {
    if (selectRef) {
      setDistrict("")
      setResetKey((prevKey) => prevKey + 1)
    }
  }
  return (
    <div className="flex flex-col text-[12px]  gap-2">
      <label htmlFor="province">District</label>
      <Select
        key={resetKey}
        ref={selectRef}
        className="basic-single focus:border-purple-300"
        classNamePrefix="select"
        defaultValue={districtsData[0]}
        isDisabled={province == "" ? true : false}
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="district"
        options={districtsData}
        onChange={(selected) => {
          setDistrict(selected.value)
        }}
      />
    </div>
  )
}

export default DistrictSelect
