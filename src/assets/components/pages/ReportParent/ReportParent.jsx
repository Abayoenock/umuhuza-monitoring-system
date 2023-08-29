import React, { useContext, useEffect, useState } from "react"

import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"

import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import avatarImage from "../../../Images/webImages/avatar.webp"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getTimeDifference } from "../Dashboard/LastSeen"
import { AuthContext } from "../../ParentDashbard/DashboardParent"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"

import PageLoader from "../../loaders/pageLoader/PageLoader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCogs } from "@fortawesome/free-solid-svg-icons"
import Settings from "./Settings"

const customStyles = {
  rows: {
    style: {
      fontSize: "11px",
      paddingLeft: "2px",
      paddingRight: "2px",
    },
  },
  headCells: {
    style: {
      fontSize: "11px",
      paddingLeft: "2px",
      paddingRight: "2px",
    },
  },
  cells: {
    style: {
      fontSize: "11px",
      paddingLeft: "2px",
      paddingRight: "2px",
    },
  },
}
const ReportParent = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const [startDate, setStartDate] = useState(new Date())
  const transformDate = (date) => {
    if (date) {
      date = new Date(date)
    } else {
      date = new Date()
    }

    const day = date.getDate()
    const month = date.getMonth() + 1 // Months are zero-indexed, so we add 1
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }
  const [sortDate, setSortDate] = useState(transformDate)
  const { token } = useContext(AuthContext)

  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=report&date=${sortDate}`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    setSortDate(transformDate(startDate))
    mYcallBackFunction()
  }, [startDate])
  useEffect(() => {
    fetchData(token, setUsersData)
    setIsDataLoading(false)
  }, [])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows)
  }

  const columns = [
    {
      name: "Student Image",
      selector: (row) => (
        <ImageWithBlurhashModal
          imageUrl={
            row["studentImage"].length > 1 ? row["studentImage"] : avatarImage
          }
          altImage="our images"
          blurhash={"LEGbh.9h3Y^ZPXa1wHXQ?sxoIBNg"}
          className=" w-full h-full object-cover aspect-square  rounded-md transition-all duration-300 hover:scale-105 cursor-pointer "
          parentClassName="w-[50px]   h-full mr-2 "
        />
      ),

      sortable: false,
    },
    {
      name: "Firstname",
      selector: (row) => row["firstName"],
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row["lastName"],

      sortable: true,
    },

    {
      name: "InTime",
      selector: (row) => getTimeDifference(row["inTime"]),
    },
    {
      name: "OutTime",
      selector: (row) =>
        row["outTime"] == null ? "--------" : getTimeDifference(row["outTime"]),
    },
  ]
  return (
    <>
      {/* {isError && <Navigate to="../admin" replace={true} />} */}
      {isLoading && (
        <div className="flex w-full min-h-[calc(100vh-400px)] justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoading && (
        <div className="w-[99%] mt-10 px-8 text-xs border-[1px] border-purple-500 border-dotted m-1 relative">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date)
              setSortDate(transformDate(date))
            }}
            className="border-gray-300 p-3 border-[1px] shadow-sm rounded-sm px-4 bg-purple-50 w-[200px] md:w-[400px] -translate-y-4 "
          />
          <button
            className=" absolute right-2 top-2 p-2 px-3 bg-purple-600 transition-all duration-300 hover:bg-purple-700 text-white font-semibold rounded-md "
            onClick={() => setOpenDialog(true)}
          >
            <FontAwesomeIcon icon={faCogs} /> Settings
          </button>
          <DataTable
            title=" "
            columns={columns}
            data={usersData}
            selectableRows="true"
            onSelectedRowsChange={handleChange}
            selectableRowsHighlight="true"
            pointerOnHover="false"
            pagination
            button="false"
            rtl="false"
            visible="false"
            striped="true"
            direction="auto"
            responsive="true"
            contextMessage={{
              singular: "student",
              plural: "students",
              message: "selected",
            }}
            customStyles={customStyles}
            progressPending={isDataLoading}
          />

          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
            sx={{
              color: "#fff",
              backgroundColor: "rgba(147, 51, 234,0.7)",
              backdropFilter: "blur(3px)",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            maxWidth={"96%"}
          >
            <DialogTitle>
              <span className=" font-semibold text-sm text-textColor">
                Change the SMS notification settings
              </span>{" "}
            </DialogTitle>
            <DialogContent>
              <Settings handleCloseDialog={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  )
}

export default ReportParent
