import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom'
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import ProjectCard from "./ProjectCard";
import ProjectForm from "./Forms/ProjectForm"
import ComponentAndDetails from "./SubViews/ComponentAndDetailsView"
import FadeIn from "../../Helpers/FadeIn"
import "./Projects.css";

const ProjectList = () => {
    const [displayComponent, setDisplayComponent] = useState();
    const [addCompActive, setAddCompActive] = useState(false);

    const history = useHistory();

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
        showProjectForm,
        setShowProjectForm,
        displayProject,
        setDisplayProject,
        GetUsersProjects,
        DeleteProject
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
        setShowProjectForm(false)
        setDisplayProject(projects.find((project) => (project.id === id)))
        setAddCompActive(true)
        setDisplayComponent()
    }

    // set a selected component into state for display
    const selectComponentDisplay = (id) => {
        let components = displayProject.components
        setDisplayComponent(components.find((component) => (component.id === id)))
    }
    //Form handling

    const cancelAdd = () => {
        setShowProjectForm(false);
        setDisplayProject();
    }

    const deleteThisProject = (id) => {
        DeleteProject(id)
    }

//////////////////////////
///////VIEWS/////////////
////////////////////////


//Select the view to be displayed on the right 2/3 of the page
    const viewSelector = () => {
    
//return this if the Add Project button has not been clicked
    if(!showProjectForm) {
        return (
            <ComponentAndDetails
            displayProject={displayProject}
            displayComponent={displayComponent}
            addCompActive={addCompActive}
            setDisplayComponent={setDisplayComponent}
            selectComponentDisplay={selectComponentDisplay} />   
            )
        }
//return this if the Add Project button has been clicked (Show the Add form)
        else if (showProjectForm) {
            return (
                    <ProjectForm
                        cancelAdd={cancelAdd} />                        
                )
        }
    }

//Conditional rendering for larger screen size
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
                                    <button className="fas fa-drafting-compass project_Add" onClick={() => setShowProjectForm(true) }>+</button>
                                    </h6>
                                {projects.map((project) =>
                                    <ProjectCard 
                                        key={project.id}
                                        project={project}
                                        selectDisplay={selectDisplay}
                                        deleteThisProject={deleteThisProject}
                                    />
                                )}                               
                            </div>

                            {viewSelector()}

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

export default ProjectList;
