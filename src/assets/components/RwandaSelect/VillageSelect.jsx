import React, { useEffect, useRef, useState } from "react"
import Select from "react-select"
import useFetch from "../useFetch"

function VillageSelect({
  province,
  district,
  sector,
  cell,
  setVillage,
  Defaultvillage,
}) {
  const [resetKey, setResetKey] = useState(0)
  const [villageData, setVillageData] = useState([
    {
      value: Defaultvillage,
      label: Defaultvillage == "" ? "Select Cell" : Defaultvillage,
    },
  ])
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/RwandaData.php?t=V&province=${province}&district=${district}&sector=${sector} &cell=${cell}`
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const selectRef = useRef(null)
  useEffect(() => {
    handleResetSelect()
    fetchData("", setVillageData)
  }, [cell])
  const handleResetSelect = () => {
    if (selectRef) {
      setVillage("")
      setResetKey((prevKey) => prevKey + 1)
    }
  }
  return (
    <div className="flex flex-col text-[12px]  gap-2">
      <label htmlFor="province">Village</label>
      <Select
        key={resetKey}
        ref={selectRef}
        className="basic-single focus:border-purple-300"
        classNamePrefix="select"
        defaultValue={villageData[0]}
        isDisabled={
          Defaultvillage.length > 0 ? false : cell == "" ? true : false
        }
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="village"
        options={villageData}
        onChange={(selected) => {
          setVillage(selected.value)
        }}
      />
    </div>
  )
}

export default VillageSelect
