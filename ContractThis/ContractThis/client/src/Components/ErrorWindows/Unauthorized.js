import React from 'react';
import { useHistory } from 'react-router-dom'

import { Button } from 'reactstrap'


const Unauthorized = () => {

    const history = useHistory()
    return (
        <>
            <h2>Sorry, you are not authorized to access that page</h2>
            <Button onClick={() => history.push("/projects")}>Home</Button>
        </>
    )
}

export default Unauthorized