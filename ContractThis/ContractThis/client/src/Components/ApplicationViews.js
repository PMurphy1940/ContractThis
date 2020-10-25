import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider"
import Login from "./Login";
import Register from "./Registration"
import ProjectList from "./Projects/ProjectList"
import { ProjectProvider } from "../Providers/ProjectProvider";

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

                <Route path="/projects">
                    <ProjectProvider>
                        <ProjectList />     
                    </ProjectProvider>
                </Route>

            </Switch>
        </main>
    )
}

export default ApplicationViews