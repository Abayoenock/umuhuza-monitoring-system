import React, { useState } from "react"
import { Blurhash } from "react-blurhash"

const ImageWithBlurhash = ({
  blurhash,
  imageUrl,
  className,
  parentClassName,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
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
      />
    </div>
  )
}

export default ImageWithBlurhash
