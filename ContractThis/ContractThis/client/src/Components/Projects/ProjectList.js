import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import ProjectCard from "./ProjectCard";
import ProjectComponentCard from "./ProjectComponentCard"
import ProjectComponentDetailCard from "./ProjectComponentDetailCard"
import "./Projects.css";

const ProjectList = () => {
    const [displayProject, setDisplayProject] = useState()
    const [displayComponent, setDisplayComponent] = useState()
    const [addCompActive, setAddCompActive] = useState(false)

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

    //Context imports
    const {
        projects, 
        GetUsersProjects
    } = useContext(ProjectContext)

    const {
        getUserById,
        aUser
    } = useContext(ProfileContext)

    useEffect(() => {
        GetUsersProjects(1)
        getUserById(1)
    }, [])
    //Set a selected project into state for display
    const selectDisplay = (id) => {
        setDisplayProject(projects.find((project) => (project.id === id)))
        setAddCompActive(true)
        setDisplayComponent()
    }
    // set a selected component into state for display
    const selectComponentDisplay = (id) => {
        let components = displayProject.components
        setDisplayComponent(components.find((component) => (component.id === id)))
    }

    //Timing delay modifier for gsap effect on component cards
    let indexDelay = 1
    //Conditional rendering for large screen size
    if (width > breakpointWidth){
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
                        <button className="logout_Button">logout</button>
                    </div>
                    <div className="project_Dashboard">
                        <h4>Project Dashboard</h4>
                        <div className="big_Project_Window">
                            <div className="project_Side_On_Large">
                                    <h6>Projects
                                    <button className="fas fa-drafting-compass project_Add">+</button>
                                    </h6>
                                {projects.map((project) =>
                                    <ProjectCard 
                                        key={project.id}
                                        project={project}
                                        selectDisplay={selectDisplay}

                                    />
                                )}                               
                            </div>
                            <div className="component_List_Container">
                                <h6>Components<button className="fas fa-paint-roller project_Add" disabled={!addCompActive}>+</button></h6>
                                    {(displayProject !== undefined && displayProject.components !== undefined) && displayProject.components.map((component) =>
                                        <ProjectComponentCard 
                                            key={component.id}
                                            component={component}
                                            selectComponentDisplay={selectComponentDisplay}
                                            indexDelay={indexDelay++}
                                            
                                        />
                                    )}
                            </div>
                            <div className="component_Detail_Container">
                                <h6>Details</h6>
                                    {(displayComponent !== undefined) && 
                                        <ProjectComponentDetailCard 
                                            key={displayComponent.id}
                                            displayComponent={displayComponent}
                                            
                                        />
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         )
    }

    //Conditional return for mobile devices
    return (
       <div className="project_List_Container">
           <div className="top_Space">
               {(aUser !== undefined) &&
               <>
               <p className="userName">{aUser.screenName}</p>
               <img className="user_Image"src={aUser.imageLocation} alt="user"/>
               </>
               }
               <button className="logout_Button">logout</button>
           </div>
           <div className="project_Dashboard">
               <h4>Project Dashboard</h4>
                {projects.map((project) =>
                    <ProjectCard 
                        key={project.id}
                        project={project}
                    />
                )}
           </div>
       </div>
    )
}

export default ProjectList