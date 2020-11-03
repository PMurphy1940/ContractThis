import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileProvider"
import LocalUserProvider from "../Helpers/LocalUserGets"
import { WindowStateContext } from "../Providers/WindowStateProvider"


export const ProjectContext = createContext()

export function ProjectProvider(props) {
    const apiUrl = "/api/project";
    const { getToken } = useContext(ProfileContext)
    const { setShowComponentFormActive, setShowProjectForm } = useContext(WindowStateContext);
    const [projects, setProjects] = useState([]);
    const [displayProject, setDisplayProject] = useState();
    const [update, setUpdate] = useState(false);
    const [updatedProject, setUpdatedProject] = useState(false)

// update the users project list when something has been changed, without doing a full GET of all projects
// To reduce bandwidth usage
    useEffect(() =>{
        UpdateProjects(displayProject)
      },[displayProject])

    const UpdateProjects = (updatedProject) => {
      let projectsStateChange = [...projects]
      let changedIndex = projects.findIndex((project) => project.id === updatedProject.id)
      projectsStateChange[changedIndex] = updatedProject
      setProjects(projectsStateChange) 
    }

    const GetUsersProjects = (id) => {
      getToken().then((token) =>
      fetch(`${apiUrl}/byowner`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then((response) => response.json())
        .then(setProjects)
        setUpdatedProject(!updatedProject)
    }

    const GetProjectById = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
        .then(setDisplayProject)
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

    const UpdateProject = (projectObject) => {
      getToken().then((token) =>      
        fetch(`${apiUrl}/${projectObject.id}`, {
            method: "PUT",
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

    const DeleteProject = (id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then(() => {
        setUpdate(!update)
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
              GetProjectById(componentObject.projectId)
              return response.json();
            }
            window.alert(new Error("Unable to complete request"));
          });    
    }

    const UpdateComponent = (updatedComponent, id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/component/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedComponent)
      }))
      .then((response) => {
        if (response.ok) {
              GetProjectById(updatedComponent.projectId)
              return response.json();
        }
        window.alert(new Error("Unable to complete request"));
      })
    }


    return (
        <ProjectContext.Provider
          value={{ projects, displayProject, setDisplayProject,
                    GetUsersProjects, AddNewProject, update, setUpdate,
                    UpdateProject, DeleteProject, AddNewComponent, 
                    UpdateComponent, updatedProject, GetProjectById }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}




