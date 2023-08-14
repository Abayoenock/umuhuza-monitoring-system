import React, { useEffect, useState } from "react"

import { Routes, Route } from "react-router-dom"
import Dashboard from "./assets/components/AdminDashbard/Dashboard"
import Login from "./assets/components/LogIn/Login"
import useFetch from "./assets/components/useFetch"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ErrorPage from "./assets/components/pages/ErrorPage"
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/my-portal/*"
          element={
            <>
              <Dashboard />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <ErrorPage to="../" />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
