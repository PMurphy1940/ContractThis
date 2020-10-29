import React from 'react';
import FadeIn from "../../../Helpers/FadeIn"


const ImageCard = (props) => {

    return (
        <FadeIn
            paused="true"
            delay= {(props.indexDelay * .3)}
            distance='0'
            >
            <p>pictures</p>
        </FadeIn>
    )
}

export default ImageCard