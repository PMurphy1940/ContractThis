import React from 'react';
import { useHistory } from 'react-router-dom'

const ComponentForm = () => {
    const history = useHistory();

    return (
        <>
        <p>ComponentForm</p>
        <button onClick={() => {history.goBack()}}>Back</button>
        </>
    )
}

export default ComponentForm