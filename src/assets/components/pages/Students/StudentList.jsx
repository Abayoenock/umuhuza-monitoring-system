import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import avatarImage from "../../../Images/webImages/avatar.webp"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
import {
  faAnglesRight,
  faTrashCan,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons"

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"
import ParentInfo from "./ParentInfo"
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
const StudentList = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogLock, setOpenDialogLock] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserDelete, setSelectedUserDelete] = useState(null)
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=students`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    fetchData(token, setUsersData)
    setIsDataLoading(false)
  }, [])
  const urlDelete = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=delete&tbl=guardians&col_Name=guardianID&dataID=${selectedUserDelete}`
  const [success, setSuccess] = useState([])
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    data,
    fetchData: fetchDataDelete,
  } = useFetch(urlDelete)
  const deleteUser = () => {
    fetchDataDelete(token, setSuccess)
    handleCloseDialog()
  }
  useEffect(() => {
    handleCloseDialog()
    if (success.valid) {
      toast.success(
        `${selectedUser?.firstName}'s account successfuly deleted `,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      mYcallBackFunction()
    } else if (success.valid == false) {
      toast.success(
        ` Failed to delete ${selectedUser?.firstName} , please try again later `,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
    }
  }, [success])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialogLock = () => {
    setOpenDialogLock(false)
  }
  const handleClickOpenDialogLock = () => {
    setOpenDialogLock(true)
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
      name: "gender",
      selector: (row) => row["gender"],
    },
    {
      name: "DOB",
      selector: (row) => row["DOB"],
    },
    {
      name: "date Recorded",
      selector: (row) => row["studentDateAdded"],
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faEye}
            className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
            onClick={() => {
              const user = usersData.filter((user) => {
                return user.studentID === row.studentID
              })
              console.log(user[0])
              setSelectedUserDelete(row.studentID)
              setSelectedUser(user[0])
              //alert(0)
              handleClickOpenDialogLock()
            }}
          />
          <NavLink to={`../edit-parent/${row["studentID"]}`}>
            <FontAwesomeIcon
              icon={faEdit}
              className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
            />
          </NavLink>

          <FontAwesomeIcon
            icon={faTrashCan}
            title="delete user"
            onClick={() => {
              const user = usersData.filter((user) => {
                return user.studentID === row.studentID
              })
              setSelectedUserDelete(row.studentID)
              setSelectedUser(user[0])
              handleClickOpenDialog()
            }}
            className=" p-2 px-3 rounded-sm bg-red-400 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  return (
    <>
      {isError && <Navigate to="../admin" replace={true} />}
      {isLoading && (
        <div className="flex w-full min-h-[calc(100vh-400px)] justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoading && (
        <div className="w-full mt-3 px-8 text-xs">
          <NavLink to={"./new-student"}>
            {" "}
            <button className="bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:-translate-x-1 hover:bg-purple-600">
              Add new student{" "}
              <FontAwesomeIcon icon={faAnglesRight} className="ml-2" />
            </button>{" "}
          </NavLink>
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
              backgroundColor: "rgba(168, 85, 247,0.6)",
              backdropFilter: "blur(3px)",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <DialogTitle>
              <span className=" font-semibold text-lg text-textColor">{`Delete  ${selectedUser?.firstName}'s account`}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <span className="text-sm text-lightBlack">
                  Are you sure you want to delete {selectedUser?.firstName}{" "}
                  {selectedUser?.lastName} from the system Keep in mind that
                  this process can not be reversed
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleCloseDialog}
                className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="border-none bg-purple-500 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-purple-600 "
              >
                Confirm
              </button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDialogLock}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialogLock}
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
              {" "}
              <p className=" font-semibold text-sm text-textColor">{`   ${selectedUser?.firstName}  ${selectedUser?.lastName}'s guardian  account information `}</p>{" "}
            </DialogTitle>
            <DialogContent>
              {/* the content to show the parents info */}
              <ParentInfo id={selectedUser?.guardianID} />
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleCloseDialogLock}
                className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
              >
                Close
              </button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  )
}

export default StudentList
