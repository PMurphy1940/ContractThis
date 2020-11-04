import React, { useState, useEffect } from 'react';
import FadeIn from "../../../Helpers/FadeIn"
import ImageChecker from "../../../Helpers/ImageUrlChecker"



const ImageCard = (props) => {
    const [image, setImage] = useState(props.image.projectComponentImageUrl)
    
    useEffect(() => {
        setImage(ImageChecker.convertPath(props.image.projectComponentImageUrl))
    }, [])

    return (
        <FadeIn
            paused="true"
            delay= {(props.indexDelay * .3)}
            distance='0'
            >
            <img className="component_Image" src={image} />
        </FadeIn>
    )
}

export default ImageCard