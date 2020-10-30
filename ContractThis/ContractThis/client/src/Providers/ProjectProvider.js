import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileProvider"
import LocalUserProvider from "../Helpers/LocalUserGets"
import { WindowStateContext } from "../Providers/WindowStateProvider"

export const ProjectContext = createContext()

export function ProjectProvider(props) {
    const apiUrl = "/api/project";
    const { getToken } = useContext(ProfileContext)
    const { editFormOpen,setEditFormOpen,
            showComponentFormActive, setShowComponentFormActive,
            showProjectForm, setShowProjectForm
          } = useContext(WindowStateContext);

    const [projects, setProjects] = useState([]);
    const [displayProject, setDisplayProject] = useState();
    // const [showProjectForm, setShowProjectForm] = useState(false);
    // const [showComponentFormActive, setShowComponentFormActive] = useState(false)
    const [update, setUpdate] = useState(false);
    const [updatedProject, setUpdatedProject] = useState(false)
    // const [editFormOpen,setEditFormOpen] = useState(false)

//     useEffect(() =>{
//       UpdateProjects(displayProject)
//     },[displayProject])

// // update the users project list when something has been changed, without doing a full GET of all projects
//     const UpdateProjects = (updatedProject) => {
//       // setDisplayProject(updatedProject)

//       let projectsStateChange = [...projects]
//       let changedIndex = projects.findIndex((project) => project.id === updatedProject.id)
//       projectsStateChange[changedIndex] = updatedProject
//       setProjects(projectsStateChange) 
//       return projectsStateChange
//     }


//Database calls//
    const GetUsersProjects = (id) => {
        return fetch(`${apiUrl}/byowner/${id}`)
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
        // GetUsersProjects(LocalUserProvider.userId())
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
              setUpdate(!update)
              // setDisplayProject(GetProjectById(componentObject.projectId))
              // GetUsersProjects(LocalUserProvider.userId())
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
              setUpdate(!update)
              return response.json();
        }
        window.alert(new Error("Unable to complete request"));
      })
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
        setUpdate(!update)
        // GetUsersProjects(LocalUserProvider.userId())
      })
    }


    return (
        <ProjectContext.Provider
          value={{ projects, displayProject, setDisplayProject,
                    GetUsersProjects, AddNewProject, update, setUpdate,
                    UpdateProject, DeleteProject, AddNewComponent, UpdateComponent,   
                    DeleteComponent, updatedProject, GetProjectById }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}




