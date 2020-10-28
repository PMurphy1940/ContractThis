import React, { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import { WindowStateContext } from "../../Providers/WindowStateProvider"
import ProjectCard from "../Projects/ProjectCard";
import LocalUserProvider from "../../Helpers/LocalUserGets"


const ComponentOverview = (props) => {

////////////////////////
////DEVELOPMENT ONLY///
//////////////////////

useEffect(()=>{
    GetProjectById(1)
}, [])


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
                    {(aUser !== undefined) &&
                    <>
                    <p className="userName">{aUser.screenName}</p>
                    <img className="user_Image"src={aUser.imageLocation} alt="user"/>
                    </>
                    }
                    <button className="logout_Button" onClick={() => LogOutUser()} >logout</button>
                </div>
                <div className="project_Dashboard">
                    <h4>Project Overview</h4>
                    <div className="big_Project_Window">
                        <div className="project_Side_On_Large">
                            <h6>Project</h6>
                            <div className="project_Card">
                                <div className="inside_Button_Container">
                                    <div className="address">
                                        {(displayProject === undefined) ? history.push("/projects")
                                        :
                                        <>
                                        <p>{displayProject.projectName}</p>
                                        <p>{displayProject.locationAddress}</p>
                                        <img className="project_Image" src={displayProject.imageLocation} />
                                    </>
                                        }
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentOverview