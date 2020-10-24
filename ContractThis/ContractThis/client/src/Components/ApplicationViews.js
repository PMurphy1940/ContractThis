import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider"
import Login from "./Login";
import Register from "./Registration"

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(ProfileContext);
    return (
        <main>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    )
}

export default ApplicationViews