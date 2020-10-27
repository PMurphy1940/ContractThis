import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileProvider"
import LocalUserProvider from "../Helpers/LocalUserGets"
export const ProjectContext = createContext()

export function ProjectProvider(props) {
    const apiUrl = "/api/project";
    const { getToken } = useContext(ProfileContext)
    const [projects, setProjects] = useState([]);



    const GetUsersProjects = (id) => {
        return fetch(`${apiUrl}/${id}`)
        .then((response) => response.json())
        .then(setProjects)
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
        GetUsersProjects(LocalUserProvider.userId)
      })
    }


    return (
        <ProjectContext.Provider
          value={{ projects, GetUsersProjects, AddNewProject, UpdateProject, DeleteProject }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}



