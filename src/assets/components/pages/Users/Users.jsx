import React from "react"
import { Route, Routes } from "react-router-dom"
import UserList from "./UsersList"
import NewUser from "./NewUser"
import EditUser from "./EditUser"

function Users() {
  return (
    <Routes>
      <Route path={"/"} element={<UserList />} />
      <Route path={"/new-user"} element={<NewUser />} />
      <Route path={"/Edit-user/:userID"} element={<EditUser />} />
    </Routes>
  )
}

export default Users
