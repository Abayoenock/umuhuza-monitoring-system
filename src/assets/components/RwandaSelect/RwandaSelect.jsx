import React, { useState } from "react"
import ProvinceSelect from "./ProvinceSelect"
import DistrictSelect from "./DistrictSelect"
import SectorSelect from "./SectorSelect"
import CellSelect from "./CellSelect"
import VillageSelect from "./VillageSelect"

function RwandaSelect({
  Defaultprovince = "",
  Defaultdistrict = "",
  Defaultsector = "",
  Defaultcell = "",
  Defaultvillage = "",
}) {
  const [province, setProvince] = useState(Defaultprovince)
  const [district, setDistrict] = useState(Defaultdistrict)
  const [sector, setSector] = useState(Defaultsector)
  const [cell, setCell] = useState(Defaultcell)
  const [village, setVillage] = useState(Defaultvillage)
  return (
    <>
      <ProvinceSelect
        setProvince={setProvince}
        Defaultprovince={Defaultprovince}
      />
      <DistrictSelect
        province={province}
        setDistrict={setDistrict}
        Defaultdistrict={Defaultdistrict}
      />
      <SectorSelect
        province={province}
        district={district}
        setSector={setSector}
        Defaultsector={Defaultsector}
      />
      <CellSelect
        province={province}
        district={district}
        sector={sector}
        setCell={setCell}
        Defaultcell={Defaultcell}
      />
      <VillageSelect
        province={province}
        district={district}
        sector={sector}
        cell={cell}
        setVillage={setVillage}
        Defaultvillage={Defaultvillage}
      />
    </>
  )
}

export default RwandaSelect
