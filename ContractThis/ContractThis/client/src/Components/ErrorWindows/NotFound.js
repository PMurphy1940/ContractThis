import React from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from 'reactstrap'


const NotFound = () => {

    const history = useHistory()
    return (
        <>
            <h2>Sorry, the page you requested was not found</h2>
            <Button onClick={() => history.push("/projects")}>Home</Button>
        </>
    )
}

export default NotFound