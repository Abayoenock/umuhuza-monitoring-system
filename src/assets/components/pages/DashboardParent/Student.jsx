import React from "react"
import ImageWithBlurhashModal from "../../ImageWithBlurhashModal"
import avatarImage from "../../../Images/webImages/avatar.webp"
function Student({ image, names, BOD }) {
  return (
    <div className=" w-full border-[1px] border-purple-300 border-dotted p-6  mt-5">
      <div className="w-full flex flex-col gap-3">
        <ImageWithBlurhashModal
          imageUrl={image ? image : avatarImage}
          altImage="our images"
          blurhash={"LEGbh.9h3Y^ZPXa1wHXQ?sxoIBNg"}
          className=" w-full h-full object-cover aspect-square  rounded-md transition-all duration-300 hover:scale-105 cursor-pointer "
          parentClassName="w-full   h-full "
        />
      </div>
      <div className=" text-sm text-gray-500">
        <p>
          {" "}
          <span className=" font-semibold"> Names: </span> {names}
        </p>
        <p>
          <span className=" font-semibold"> DOB: </span> {BOD}
        </p>
      </div>
    </div>
  )
}

export default Student
