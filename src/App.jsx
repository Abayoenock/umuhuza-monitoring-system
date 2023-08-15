import React, { useEffect, useState } from "react"

import { Routes, Route } from "react-router-dom"
import Dashboard from "./assets/components/AdminDashbard/Dashboard"
import Login from "./assets/components/LogIn/Login"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ErrorPage from "./assets/components/pages/ErrorPage"
import DashboardParent from "./assets/components/ParentDashbard/DashboardParent"
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
        <Route
          path="/parents-portal/*"
          element={
            <>
              <DashboardParent />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
