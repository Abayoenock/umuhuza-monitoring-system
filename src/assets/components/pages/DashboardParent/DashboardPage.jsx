import React, { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../ParentDashbard/DashboardParent"
import PageLoader from "../../loaders/pageLoader/PageLoader"
import useFetch from "../../useFetch"
import DashboardStats from "./DashboardStats"
import Student from "./Student"
function DashboardPage() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)
  const [studentData, setStudentData] = useState([])
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestDataParent.php?t=studentData`
  const { isLoading, isError, data, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setStudentData)
  }, [])
  return (
    <>
      {isLoading && (
        <div className=" w-full flex  min-h-[80vh] justify-center items-center ">
          <PageLoader />
        </div>
      )}

      {!isLoading && (
        <div className=" p-3">
          <DashboardStats />
          <div className="w-[98%] mx-auto border-[1px] border-purple-300 border-dotted p-2  mt-5">
            <div className="p-2 bg-purple-200 w-full font-semibold text-[13px]">
              Registered students info
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 ">
              {studentData?.[0]?.map((student, index) => {
                return (
                  <Student
                    key={index}
                    names={student.firstName + " " + student.lastName}
                    image={student.studentImage}
                    BOD={student.BOD}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardPage
