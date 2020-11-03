import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from "../../Providers/ProjectProvider";
import { ProfileContext } from "../../Providers/ProfileProvider";
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../../Providers/ComponentProvider";
import { BidContext } from "../../Providers/BidProvider";
import { SubContractorContext } from "../../Providers/SubContractorProvider";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./Forms/ProjectForm";
import ProjectEditForm from "./Forms/ProjectEditForm";
import ComponentAndDetails from "./SubViews/ComponentAndDetailsView";
import LocalUserProvider from "../../Helpers/LocalUserGets";
import SubContractorRequest from "../Subcontractor/SubContractorRequests";
import DeleteProjectModal from "../Modals/DeleteProjectModal"
import "./Projects.css";

const ProjectList = () => {
    const [projectToDelete, setProjectToDelete] = useState();
    const aUser = {
        id: LocalUserProvider.userId(),
        screenName: LocalUserProvider.userDisplayName(),
        imageLocation: LocalUserProvider.userImageLoc(),
        isSubcontractor: LocalUserProvider.isSubcontractor()

    }

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
        displayProject,
        setDisplayProject,
        GetUsersProjects,
        DeleteProject,
        update,
        updatedProject,
    } = useContext(ProjectContext)

    const {
        logout
    } = useContext(ProfileContext)

    const {
        addCompActive, setAddCompActive,
        editProjectView, setEditProjectView,
        showProjectForm, setShowProjectForm,
        setShowComponentFormActive,
        setEditFormOpen, 
        setOpenDeleteProjectModal
    } = useContext(WindowStateContext)

    const {
        images, setImages, displayComponent, setDisplayComponent, GetComponentById
    } = useContext(ComponentContext)

    const {
        bidRequests, GetBidsBySubContractorId
    } = useContext(BidContext)

    const { GetSubContractorJobs, subContractorJobs } = useContext(SubContractorContext);

    const LogOutUser = () => {
        logout()
        history.push("/logout")
    }

//If the user is a subcontractor, check to see if anyone has contacted them about doing work
    useEffect(() => {
        if(aUser.isSubcontractor){
            aUser.subcontractorId = LocalUserProvider.subcontractorId();
            GetBidsBySubContractorId(aUser.subcontractorId)
            GetSubContractorJobs(aUser.subcontractorId)
        }
    }, [])

    useEffect(() => {
        GetUsersProjects(LocalUserProvider.userId())
    }, [update])
    
    useEffect(() => {
        if(displayProject !== undefined) {
            setDisplayProject(projects.find((project) => (project.id === displayProject.id)))
        }
    },[updatedProject])

    useEffect(() => {
        if (displayComponent !== undefined){
            selectComponentDisplay(displayComponent.id)
        }
    }, [images])



    //Set a selected project into state for display and place window views into their default position
    const selectDisplay = (id) => {
        setShowProjectForm(false);
        setEditFormOpen(false);
        setEditProjectView(false);
        setShowComponentFormActive(false);
        setDisplayProject(projects.find((project) => (project.id === id)));
        setAddCompActive(true);
        setDisplayComponent();
    }

    // set a selected component into state for display
    const selectComponentDisplay = (id) => {
        setShowComponentFormActive(false)
        setDisplayComponent(GetComponentById(id))
        // let components = [...displayProject.components]
        // setDisplayComponent(components.find((component) => (component.id === id)));
    }
    useEffect(()=> {
        if (displayComponent !== undefined && displayComponent.images !== undefined){
            setImages(displayComponent.images)
        }
    }, [displayComponent])

    const editProject = (id) => {
        setDisplayProject(projects.find((project) => (project.id === id)));
        setEditProjectView(true);
        setShowProjectForm(true);
    }

    const cancelAdd = () => {
        setEditProjectView(false);
        setShowComponentFormActive(false);
        setShowProjectForm(false);
        setDisplayProject();
    }

    const deleteThisProject = (id) => {
        setProjectToDelete(projects.find((project) => (project.id === id)));
        setEditProjectView(false);
        setShowComponentFormActive(false);
        setShowProjectForm(false);
        setOpenDeleteProjectModal(true)
    }

    const completeDelete = () => {
        DeleteProject(projectToDelete.id);
        setOpenDeleteProjectModal(false);
        setDisplayComponent();
        setDisplayProject();
    }

    const cancelDelete = () => {
        setOpenDeleteProjectModal(false)
    }

    const bigDetailPage = (id) => {
        selectDisplay(id)
        history.push("/components");
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
                    <>
                        {editProjectView ? 
                            <ProjectEditForm
                            cancelAdd={cancelAdd} 
                            displayProject={displayProject}
                            />
                            :
                            <ProjectForm
                                cancelAdd={cancelAdd} />
                        }
                    </>                        
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
                        <button className="logout_Button" onClick={() => LogOutUser()} >logout</button>
                    </div>
                    <div className="project_Dashboard">
                        {(aUser.isSubcontractor === true) ?
                        <> 
                        <h4>
                            <div className="business_Project_Banner_Container">
                                <button className="business_Link_Button business_Project_Banner" onClick={ () => selectDisplay() }>
                                    Personal
                                </button>
                                <button className="business_Link_Button business_Project_Banner" onClick={ () => selectDisplay() }>
                                    {aUser.screenName}
                                </button>
                            </div>
                            </h4>
                        <div className="big_Project_Window">
                            <div className="project_Side_On_Large">
                                    <h6>Projects
                                        <button className="fas fa-drafting-compass project_Add" onClick={() => setShowProjectForm(!showProjectForm) }>+</button>
                                    </h6>
                                {(bidRequests !== undefined) && bidRequests.map((bid) =>
                                    <SubContractorRequest
                                        key={bid.id}
                                        bid={bid}
                                        />
                                )}                                    
                            </div>

                            {viewSelector()}

                        </div>
                        </>
                        :
                        <> 
                        <h4>Project Dashboard</h4>
                        <div className="big_Project_Window">
                            <div className="project_Side_On_Large">
                                    <h6>Projects
                                    <button className="fas fa-drafting-compass project_Add" onClick={() => setShowProjectForm(!showProjectForm) }>+</button>
                                    </h6>
                                    {projects.map((project) =>
                                    <ProjectCard 
                                        key={project.id}
                                        project={project}
                                        selectDisplay={selectDisplay}
                                        deleteThisProject={deleteThisProject}
                                        editProject={editProject}
                                        bigDetailPage={bigDetailPage}
                                    />
                                )}                               
                            </div>

                            {viewSelector()}

                        </div>
                        </>
                        }
                    </div>
                </div>
                {(projectToDelete !== undefined) && 
                    <DeleteProjectModal 
                        completeDelete={completeDelete}
                        cancelDelete={cancelDelete}
                        projectToDelete={projectToDelete}
                        />
                }
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
