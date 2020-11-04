import React, { useState, useEffect } from 'react';
import ImageChecker from "../../../Helpers/ImageUrlChecker"



const ImageCard = (props) => {
    const [image, setImage] = useState(props.image.projectComponentImageUrl)
    
    useEffect(() => {
        setImage(ImageChecker.convertPath(props.image.projectComponentImageUrl))
    }, [])

    return (
            <img className="component_Image" src={image} />
    )
}

export default ImageCard