import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider";
import Login from "./Login_Reg/Login";
import Register from "./Login_Reg/Registration";
import ProjectList from "./Projects/ProjectList";
import ComponentOverview from "./ProjComponent/ComponentOverview"
import { ComponentProvider } from "../Providers/ComponentProvider"
import { Logout } from "./Login_Reg/Logout";
import { SubContractorProvider } from "../Providers/SubContractorProvider";
import { ProjectProvider } from "../Providers/ProjectProvider";
import { LoginProvider } from "../Providers/LoginStateProvider";
import { ChatProvider } from "../Providers/ChatProvider";

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
                        <SubContractorProvider>
                            <Register />
                        </SubContractorProvider>
                    </LoginProvider>
                </Route>

                <Route path="/projects">
                    <ProjectProvider>
                        <ComponentProvider>
                            <SubContractorProvider>
                                <ProjectList />     
                            </SubContractorProvider>
                        </ComponentProvider>
                    </ProjectProvider>
                </Route>

                <Route path="/components">
                    <ProjectProvider>
                        <SubContractorProvider>
                            <ComponentProvider>
                                <ChatProvider>
                                    <ComponentOverview/>    
                                </ChatProvider>
                            </ComponentProvider>
                        </SubContractorProvider>
                    </ProjectProvider>
                </Route>

                <Route path="/logout">
                    <Logout />
                </Route>

            </Switch>
        </main>
    )
}

export default ApplicationViews