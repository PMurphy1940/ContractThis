import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider"
import { ComponentContext } from "../../Providers/ComponentProvider"
import ComponentForm from "../Projects/Forms/ComponentForm"
import ComponentEditForm from "../Projects/Forms/ComponentEditForm" 
import ComponentOverviewRightSide from "./ComponentOverviewRightSide"
import "./ProjComponent.css"
import LocalUserProvider from "../../Helpers/LocalUserGets"
import ProjectComponentCard from "../Projects/ProjectComponentCard"

const ComponentOverview = (props) => {
    const [inactive, setInactive] = useState(false);
    const [activeComponents, setActiveComponents] = useState([]);
    const [inactiveComponents, setInactiveComponents] = useState([]);


    const history = useHistory()
    const aUser = {
        screenName: LocalUserProvider.userDisplayName(),
        imageLocation: LocalUserProvider.userImageLoc()
    }

    const {
        showComponentFormActive, setShowComponentFormActive, setShowImages,
        editFormOpen, setEditFormOpen, setShowSearchSubs, setShowBigShoppingList
    } = useContext(WindowStateContext)

    const {
        displayProject, setDisplayProject,
        GetProjectById,
        DeleteProject,
    } = useContext(ProjectContext)

    const {
        displayComponent, GetComponentById
    } = useContext(ComponentContext)

    const {
        logout
    } = useContext(ProfileContext)

    const LogOutUser = () => {
        logout()
        history.push("/logout")
    }

    const readActiveComponents = () => {
        setActiveComponents(displayProject.components.filter((component) => (component.dateComplete === null)))        
    }

    const readInactiveComponents = () => {
        setInactiveComponents(displayProject.components.filter((component) => (component.dateComplete !== null)))        
    }
    useEffect(() => {
        if(displayProject !== undefined && displayProject.components !== undefined){
            readActiveComponents();
            readInactiveComponents();
        }
    }, [displayProject])

    // set a selected component into state for display
    const selectComponentDisplay = (id) => {
        setShowBigShoppingList(false);
        setShowSearchSubs(false)
        setShowImages(true)
        setShowComponentFormActive(false)
        GetComponentById(id)
        // let components = [...displayProject.components]
        // setDisplayComponent(components.find((component) => (component.id === id)));
    }

     //Monitor screen width for responsive behavior
     const [width, setWidth] = useState(window.innerWidth);
     const breakpointWidth = 700;
 
     useEffect(() => {
      const handleResizeWindow = () => setWidth(window.innerWidth);
       // subscribe to window resize event
       window.addEventListener("resize", handleResizeWindow);
       return () => {
         // unsubscribe "onComponentDestroy"
         window.removeEventListener("resize", handleResizeWindow);
       };
     }, []);

     let indexDelay = 1
     
    return (
        <div className="big_Project_Board">
            
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
                    <h4 className="component_Headline">
                            <button className="fas fa-paint-roller project_Add left_Anchor" 
                                        onClick={() => {setShowComponentFormActive(true)}}
                            >+</button>
                        Project:{(displayProject !== undefined) && displayProject.projectName}

                    </h4>
                    <div className="big_Project_Window">
                        <div className="large_Component_Container">
                            {(!inactive) ? 
                            <>
                            <h6 className="flippedy_Do_Da">
                            Active
                            <button className="fas fa-sync-alt component_Inactive_Flip" onClick={() => setInactive(!inactive)}/>
                        </h6>
                        <div className="component_Details">
                            {(displayProject !== undefined && displayProject.components !== undefined) && activeComponents.map((component) =>
                                <ProjectComponentCard 
                                    key={component.id}
                                    indexDelay={indexDelay++}
                                    component={component}
                                    selectComponentDisplay={selectComponentDisplay}
                                />
                                )}
                        </div>
                        </>
                        :
                        <>
                            <h6 className="flippedy_Do_Da">
                            Complete
                            <button className="fas fa-sync-alt component_Inactive_Flip" onClick={() => setInactive(!inactive)}/>
                        </h6>
                        <div className="component_Details">
                            {(displayProject !== undefined && displayProject.components !== undefined) && inactiveComponents.map((component) =>
                                <ProjectComponentCard 
                                    key={component.id}
                                    indexDelay={indexDelay++}
                                    component={component}
                                    selectComponentDisplay={selectComponentDisplay}
                                />
                                )}
                        </div>
                        </>
                        }
                        </div>
                        <div className="large_Detail_Container">
                            <ComponentOverviewRightSide />
                        </div>
                    </div>
                </div>
           
        </div>
    )
}

export default ComponentOverview