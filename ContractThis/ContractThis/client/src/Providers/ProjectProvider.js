import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileProvider"
import LocalUserProvider from "../Helpers/LocalUserGets"
export const ProjectContext = createContext()

export function ProjectProvider(props) {
    const apiUrl = "/api/project";
    const { getToken } = useContext(ProfileContext)
    const [projects, setProjects] = useState([]);
    const [displayProject, setDisplayProject] = useState();
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showComponentFormActive, setShowComponentFormActive] = useState(false)


    const GetUsersProjects = (id) => {
        return fetch(`${apiUrl}/byowner/${id}`)
        .then((response) => response.json())
        .then(setProjects)
    }

    const GetProjectById = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
        )
    }

    const AddNewProject = (projectObject) => {
      getToken().then((token) => 
        fetch(`${apiUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(projectObject)
        }))
        .then((response) => {
            if (response.ok) {
              setShowProjectForm(false)
              GetUsersProjects(LocalUserProvider.userId())
              return response.json();
            }
            throw new Error("Unauthorized");
          });    
    }

    const UpdateProject = (id, projectObject) => {
        return fetch(`${apiUrl}/${id}`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(projectObject)
        }
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Unauthorized");
          });   
    }

    const DeleteProject = (id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then(() => {
        GetUsersProjects(LocalUserProvider.userId())
      })
    }

    const AddNewComponent = (componentObject) => {
      getToken().then((token) => 
        fetch(`${apiUrl}/component`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(componentObject)
        }))
        .then((response) => {
            if (response.ok) {
              setShowComponentFormActive(false);
              setDisplayProject(GetProjectById(componentObject.projectId));
              debugger
              setProjects(UpdateProjects(displayProject, projects))
              return response.json();
            }
            throw new Error("Unauthorized");
          });    
    }

    const DeleteComponent = (id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/component/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then(() => {
        GetUsersProjects(LocalUserProvider.userId())
      })
    }


    return (
        <ProjectContext.Provider
          value={{ projects, displayProject, setDisplayProject, showProjectForm, setShowProjectForm, 
                    showComponentFormActive, setShowComponentFormActive, GetUsersProjects, AddNewProject, 
                    UpdateProject, DeleteProject, AddNewComponent, DeleteComponent }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}
// update the users project list when something has been changed, without doing a full GET of all projects
const UpdateProjects = (updatedProject, projectsState) => {
  // let projectsStateChange = [...projects]
  let changedIndex = projectsState.findIndex((project) => project.id === updatedProject.id)
  projectsState[changedIndex] = updatedProject 
  return projectsState
}



