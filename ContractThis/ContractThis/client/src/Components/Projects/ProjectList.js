import React, { useEffect, useContext } from 'react';
import { ProjectContext } from "../../Providers/ProjectProvider"
import { ProfileContext } from "../../Providers/ProfileProvider"
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const ProjectList = () => {

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

    console.log(projects);
    console.log(aUser);
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