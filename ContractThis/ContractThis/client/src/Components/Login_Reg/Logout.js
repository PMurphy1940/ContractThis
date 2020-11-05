import React from 'react'
import { Link } from "react-router-dom";


export function Logout() {
    return (
        <div className="goodbye">
            <h2>Thanks for watching!!</h2>
            <Link to="/login"><em>Return to login</em></Link>
            <div className="links"> 
                <h2>www.linkedin.com/in/devpatrick-murphy</h2>
                <h2>https://github.com/PMurphy1940</h2>
            </div>
        </div>
    )
}
