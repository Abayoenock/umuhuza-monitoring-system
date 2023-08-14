import React from "react"
import Select from "react-select"

function ProvinceSelect({ setProvince, Defaultprovince }) {
  const options = [
    {
      value: Defaultprovince,
      label: Defaultprovince == "" ? "Select province" : Defaultprovince,
    },
    { value: "Kigali city", label: "Kigali city" },
    { value: "Eastern", label: "Eastern" },
    { value: "Western", label: "Western" },
    { value: "Nothern", label: "Nothern" },
    { value: "Southern", label: "Southern" },
  ]
  return (
    <div className="flex flex-col text-[12px]  gap-2">
      <label htmlFor="province">Province</label>
      <Select
        className="basic-single focus:border-purple-300"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={true}
        name="province"
        options={options}
        onChange={(selected) => {
          setProvince(selected.value)
        }}
      />
    </div>
  )
}

export default ProvinceSelect
