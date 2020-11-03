import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ProfileContext } from "../Providers/ProfileProvider";
import Login from "./Login_Reg/Login";
import Register from "./Login_Reg/Registration";
import ProjectList from "./Projects/ProjectList";
import ComponentOverview from "./ProjComponent/ComponentOverview";
import ComponentEditFormOnItsOwn from "./ProjComponent/Cards/ComponentEditFormOnItsOwn";
import NotFound from "./NotFound";
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
                                <BidProvider>
                                    <ProjectList />  
                                </BidProvider>   
                            </SubContractorProvider>
                        </ComponentProvider>
                    </ProjectProvider>
                </Route>

                <Route path="/components/edit/:Id(\d+)" >
                    <ProjectProvider>
                        <ComponentProvider>
                           <ComponentEditFormOnItsOwn />         
                        </ComponentProvider>
                    </ProjectProvider>
                </Route>

                <Route exact path="/components">
                    <ProjectProvider>
                        <SubContractorProvider>
                            <ComponentProvider>
                                <BidProvider>
                                    <ComponentOverview/>    
                                </BidProvider>
                            </ComponentProvider>
                        </SubContractorProvider>
                    </ProjectProvider>
                </Route>

                <Route path="/logout">
                    <Logout />
                </Route>

                <Route path="/notfound">
                    <NotFound />
                </Route>

            </Switch>
        </main>
    )
}

export default ApplicationViews