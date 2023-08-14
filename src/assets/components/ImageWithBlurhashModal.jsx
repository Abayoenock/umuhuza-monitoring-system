import React, { useState } from "react"
import { Blurhash } from "react-blurhash"
import Modal from "@mui/material/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

const ImageWithBlurhashModal = ({
  blurhash,
  imageUrl,
  className,
  parentClassName,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [open, setOpen] = React.useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  const handleClick = () => {
    handleOpenModal()
  }

  return (
    <div className={parentClassName}>
      {!imageLoaded && blurhash && (
        <Blurhash hash={blurhash} style={{ width: "100%", height: "100%" }} />
      )}
      <img
        src={imageUrl}
        alt="Image"
        style={{ display: imageLoaded ? "block" : "none" }}
        className={className}
        onLoad={handleImageLoad}
        onClick={handleClick}
      />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: "rgba(37,99,235,0.5)",
          backdropFilter: "blur(2px)",
          outline: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:focus": {
            outline: "none",
            border: "none",
          },
        }}
      >
        <div className=" relative max-w-[90%]  md:max-w-[60%] w-fit  border-none outline-none shadow-2xl p-8 px-1 rounded-md bg-white">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleCloseModal}
            title="Close"
            className=" cursor-pointer p-2 absolute -right-3 -top-3 aspect-square bg-red-600 text-white text-[22px] font-extrabold  rounded-full transition-all duration-300 hover:bg-red-800 shadow-md  hover:origin-center hover:rotate-[360deg]  "
          />
          <div className="">
            <img
              src={imageUrl}
              alt="Image"
              style={{ display: imageLoaded ? "block" : "none" }}
              className="w-full aspect-video object-contain  rounded-md"
              onLoad={handleImageLoad}
              onClick={handleClick}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ImageWithBlurhashModal
