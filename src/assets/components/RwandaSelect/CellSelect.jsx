import React, { useEffect, useRef, useState } from "react"
import Select from "react-select"
import useFetch from "../useFetch"

function CellSelect({ province, district, sector, setCell, Defaultcell }) {
  const [resetKey, setResetKey] = useState(0)
  const [cellData, setCellData] = useState([
    {
      value: Defaultcell,
      label: Defaultcell == "" ? "Select Cell" : Defaultcell,
    },
  ])
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/RwandaData.php?t=C&province=${province}&district=${district}&sector=${sector}`
  const { isLoading, isError, data, fetchData } = useFetch(url)
  const selectRef = useRef(null)
  useEffect(() => {
    handleResetSelect()
    fetchData("", setCellData)
  }, [sector])
  const handleResetSelect = () => {
    if (selectRef) {
      setCell("")
      setResetKey((prevKey) => prevKey + 1)
    }
  }
  return (
    <div className="flex flex-col text-[12px]  gap-2">
      <label htmlFor="province">Cell</label>
      <Select
        key={resetKey}
        ref={selectRef}
        className="basic-single focus:border-purple-300"
        classNamePrefix="select"
        defaultValue={cellData[0]}
        isDisabled={
          Defaultcell.length > 0 ? false : sector == "" ? true : false
        }
        isLoading={isLoading}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="cell"
        options={cellData}
        onChange={(selected) => {
          setCell(selected.value)
        }}
      />
    </div>
  )
}

export default CellSelect
