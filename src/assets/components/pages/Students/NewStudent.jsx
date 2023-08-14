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
  faAnglesLeft,
  faUserPlus,
  faEdit,
} from "@fortawesome/free-solid-svg-icons"

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"

const NewStudent = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogLock, setOpenDialogLock] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUserDelete, setSelectedUserDelete] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=parents`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    fetchData(token, setUsersData)
    setIsDataLoading(false)
  }, [])

  useEffect(() => {
    setFilteredData(usersData)
  }, [usersData])
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
        `${selectedUser?.GfirstName}'s account successfuly deleted `,
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
        ` Failed to delete ${selectedUser?.GfirstName} , please try again later `,
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
      name: "guardianImage",
      selector: (row) => (
        <ImageWithBlurhashModal
          imageUrl={
            row["guardianImage"].length > 1 ? row["guardianImage"] : avatarImage
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
      selector: (row) => row["GfirstName"],
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row["GlastName"],

      sortable: true,
    },

    {
      name: "Phone Number",
      selector: (row) => row["phoneNumber"],
    },
    {
      name: "Email",
      selector: (row) => row["email"],
    },
    {
      name: "Students",
      selector: (row) => row["students"].length,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <NavLink to={`./guardian/${row["guardianID"]}`}>
            <FontAwesomeIcon
              icon={faUserPlus}
              className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
            />
          </NavLink>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  const handleSearchData = (e) => {
    const searchText = e.currentTarget.value
    const dataFiltered = usersData.filter((data) => {
      return (
        data.GlastName.toLowerCase().includes(searchText.toLowerCase()) ||
        data.GfirstName.toLowerCase().includes(searchText.toLowerCase()) ||
        data.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        data.mothersName.toLowerCase().includes(searchText.toLowerCase()) ||
        data.fathersName.toLowerCase().includes(searchText.toLowerCase())
      )
    })

    setFilteredData(dataFiltered)
  }

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
        <div className="w-full mt-3 px-8">
          <NavLink to={"./new-parent"}>
            {" "}
            <button className="bg-purple-500 p-2 px-3 text-white text-sm rounded-sm transition-all duration-300 hover:-translate-x-1 hover:bg-purple-600">
              <FontAwesomeIcon icon={faAnglesLeft} className="mr-2" /> students
            </button>{" "}
          </NavLink>
          <div className=" w-full flex justify-end mr-4 items-center gap-3 mt-4">
            <div className=" bg-purple-100 p-2 text-xs text-gray-800  rounded-md ">
              To add a new student , search by entering the informaton of the
              guardian account for the student , when you finf the guardian ,
              click on the add user icon{" "}
            </div>
            <form action="">
              <input
                type="search"
                name=""
                id=""
                placeholder="Search for guardian ....."
                className="p-2 px-6  text-sm  border-[1px] border-purple-200 outline-none focus:outline-none rounded-md"
                onChange={handleSearchData}
              />
            </form>
          </div>
          <DataTable
            title=" "
            columns={columns}
            data={filteredData}
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
              singular: "user",
              plural: "users",
              message: "selected",
            }}
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
              <span className=" font-semibold text-lg text-textColor">{`Delete  ${selectedUser?.GfirstName}'s account`}</span>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <span className="text-sm text-lightBlack">
                  Are you sure you want to delete {selectedUser?.GfirstName}{" "}
                  {selectedUser?.GlastName} who has{" "}
                  {selectedUser?.students.length} students from the system Keep
                  in mind that this process can not be reversed
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
              backgroundColor: "rgba(37,99,235,0.7)",
              backdropFilter: "blur(3px)",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <DialogTitle>
              {" "}
              <p className=" font-semibold text-lg text-textColor">{`${
                selectedUser?.status == 0 ? "Un block " : "Block"
              }    ${selectedUser?.firstName}'s account`}</p>{" "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <p className="text-sm text-lightBlack">
                  {selectedUser?.status == 0
                    ? `Are you sure you want to allow ${selectedUser?.firstName} ${selectedUser?.lastName} to regain access back to the system ?`
                    : `Are you sure you want to block ${selectedUser?.firstName} ${selectedUser?.lastName}  access to the system ?`}
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleCloseDialogLock}
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
        </div>
      )}
    </>
  )
}

export default NewStudent
