import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider";
import Login from "./Login_Reg/Login";
import Register from "./Login_Reg/Registration";
import ProjectList from "./Projects/ProjectList";
import ComponentOverview from "./ProjComponent/ComponentOverview";
import ComponentEditFormOnItsOwn from "./ProjComponent/Cards/ComponentEditFormOnItsOwn";
import NotFound from "./ErrorWindows/NotFound";
import Unauthorized from "./ErrorWindows/Unauthorized"
import { ComponentProvider } from "../Providers/ComponentProvider";
import { Logout } from "./Login_Reg/Logout";
import { SubContractorProvider } from "../Providers/SubContractorProvider";
import { ProjectProvider } from "../Providers/ProjectProvider";
import { LoginProvider } from "../Providers/LoginStateProvider";
import { BidProvider } from "../Providers/BidProvider";

const ApplicationViews = () => {
    const { isLoggedIn } = useContext(ProfileContext);
    return (
        <main>
            <Switch>
                <Route exact path="/">
                {isLoggedIn ? 
                   <Redirect to="/projects"/>
                   :
                   <Redirect to="/login" />}
                </Route>
            </Switch>
            
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

                <Route exact path="/projects">
                {isLoggedIn ? 
                    <ProjectProvider>
                        <ComponentProvider>
                            <SubContractorProvider>
                                <BidProvider>
                                    <ProjectList />  
                                </BidProvider>   
                            </SubContractorProvider>
                        </ComponentProvider>
                    </ProjectProvider>
                    : <Redirect to="/login" />}
                </Route>

                <Route path="/components/edit/:Id(\d+)" >
                {isLoggedIn ?
                    <ProjectProvider>
                        <ComponentProvider>
                           <ComponentEditFormOnItsOwn />         
                        </ComponentProvider>
                    </ProjectProvider>
                    : <Redirect to="/login" />}
                </Route>

                <Route exact path="/components">
                    {isLoggedIn ?
                    <ProjectProvider>
                        <SubContractorProvider>
                            <ComponentProvider>
                                <BidProvider>
                                    <ComponentOverview/>    
                                </BidProvider>
                            </ComponentProvider>
                        </SubContractorProvider>
                    </ProjectProvider>
                    : <Redirect to="/login" />}
                </Route>

                <Route path="/logout">
                    <Logout />
                </Route>

                <Route path="/unauthorized">
                {isLoggedIn ? 
                    <Unauthorized />
                    : <Redirect to="/login" />}
                </Route>

                

                {isLoggedIn ? 
                <Route component={NotFound} />
                : <Redirect to="/login" />}

            </Switch>
        </main>
    )
}

export default ApplicationViews