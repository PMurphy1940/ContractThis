import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider";
import Login from "./Login_Reg/Login";
import Register from "./Login_Reg/Registration";
import ProjectList from "./Projects/ProjectList";
import ProjectForm from "./Projects/Forms/ProjectForm";
import ComponentForm from "./Projects/Forms/ComponentForm";
import { ProjectProvider } from "../Providers/ProjectProvider";
import { LoginProvider } from "../Providers/LoginStateProvider";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(ProfileContext);
    return (
        <main>
            <Switch>
                <Route path="/login">
                    <LoginProvider>
                        <Login />
                    </LoginProvider>
                </Route>

                <Route path="/register">
                    <LoginProvider>
                        <Register />
                    </LoginProvider>
                </Route>

                <Route exact path="/projects">
                    <ProjectProvider>
                        <ProjectList />     
                    </ProjectProvider>
                </Route>

                <Route path="/projects/projectform">
                    <ProjectForm />
                </Route>

                <Route path="/projects/componentform">
                    <ComponentForm />
                </Route>

            </Switch>
        </main>
    )
}

export default ApplicationViews