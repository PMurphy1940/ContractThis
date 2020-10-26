import React from 'react';
import { useHistory } from 'react-router-dom';

const ProjectForm = () => {
    const history = useHistory();

    return (
        <>
        <p>ProjectForm</p>
        <button onClick={() => {history.goBack()}}>Back</button>
        </>
    )
}

export default ProjectForm