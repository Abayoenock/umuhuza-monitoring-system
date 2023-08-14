import React from "react"
import ParentList from "./ParentsList"
import { Route, Routes } from "react-router-dom"
import Parents from "./Parents"
import ParentEdit from "./ParentEdit"

function ParentIndex() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<ParentList />} />
        <Route path={"/new-parent"} element={<Parents />} />
        <Route path={"/edit-parent/:id"} element={<ParentEdit />} />
      </Routes>
    </>
  )
}

export default ParentIndex
