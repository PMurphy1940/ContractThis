import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider"
import DetailedComponentCard from "./DetailedComponentCard"
import ComponentForm from "../Projects/Forms/ComponentForm"
import ComponentEditForm from "../Projects/Forms/ComponentEditForm" 
import ComponentOverviewRightSide from "./ComponentOverviewRightSide"
import "./ProjComponent.css"
import LocalUserProvider from "../../Helpers/LocalUserGets"


const ComponentOverview = (props) => {


    const {
        showComponentFormActive, setShowComponentFormActive,
        editFormOpen,setEditFormOpen,
    } = useContext(WindowStateContext)

    const history = useHistory()
    const aUser = {
        screenName: LocalUserProvider.userDisplayName(),
        imageLocation: LocalUserProvider.userImageLoc()
    }
    const {
        displayProject, setDisplayProject,
        GetProjectById,
        DeleteProject,
    } = useContext(ProjectContext)

    const {
        logout
    } = useContext(ProfileContext)

    const LogOutUser = () => {
        logout()
        history.push("/logout")
    }



     //Monitor screen width for responsive behavior
     const [width, setWidth] = useState(window.innerWidth);
     const breakpointWidth = 700;
 
     useEffect(() => {
      const handleResizeWindow = () => setWidth(window.innerWidth);
       // subscribe to window resize event "onComponentDidMount"
       window.addEventListener("resize", handleResizeWindow);
       return () => {
         // unsubscribe "onComponentDestroy"
         window.removeEventListener("resize", handleResizeWindow);
       };
     }, []);

    return (
        <div className="big_Project_Board">
            <div className="project_List_Container">
                <div className="top_Space">
                    <div className="little_Project_Card">
                        {(displayProject === undefined) ? history.push("/projects")
                        :
                        <>
                        <div className="address">
                            <p>{displayProject.projectName}</p>
                            <p>{displayProject.locationAddress}</p>
                        </div>
                        <img className="project_Image" src={displayProject.imageLocation} />
                    </>
                        }
                    </div>

                    <p className="userName">{aUser.screenName}</p>
                    <img className="user_Image"src={aUser.imageLocation} alt="user"/>

                    <button className="logout_Button" onClick={() => LogOutUser()} >logout</button>
                </div>
                <div className="project_Dashboard">
                    <h4>Project Overview</h4>
                    <div className="big_Project_Window">
                        <div className="large_Component_Container">
                            <h6>Components
                            <button className="fas fa-paint-roller project_Add" 
                                        onClick={() => {setShowComponentFormActive(true)}}
                            >+</button>
                            </h6>
                            <div className="large_Component_List_Container">
                                {(displayProject !== undefined && displayProject.components !== undefined) && displayProject.components.map((component) =>
                                    <DetailedComponentCard 
                                        key={component.id}
                                        component={component}
                                        selectComponentDisplay={props.selectComponentDisplay}
                                    />
                                    )}
                            </div>
                        </div>
                        <div className="large_Detail_Container">
                            <ComponentOverviewRightSide />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentOverview