import React from 'react'
import { Link } from "react-router-dom";


export function Logout() {
    return (
        <>
        <h2>Bye Felicia!</h2>
        <Link to="/login"><em>Return to login</em></Link>
        </>
    )
}
