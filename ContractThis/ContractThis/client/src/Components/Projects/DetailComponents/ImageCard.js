import React from 'react';
import FadeIn from "../../../Helpers/FadeIn"


const ImageCard = (props) => {

    return (
        <FadeIn
            paused="true"
            delay= {(props.indexDelay * .3)}
            distance='0'
            >
            <img className="component_Image" src={props.image.projectComponentImageUrl} />
        </FadeIn>
    )
}

export default ImageCard