import React from "react"
import { Route, Routes } from "react-router-dom"
import StudentList from "./StudentList"
import NewStudent from "./NewStudent"
import NewStudentAdd from "./NewStudentAdd"

function StudentIndex() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<StudentList />} />
        <Route path={"/new-student"} element={<NewStudent />} />
        <Route path={"/new-student/guardian/:id"} element={<NewStudentAdd />} />
      </Routes>
    </>
  )
}

export default StudentIndex
