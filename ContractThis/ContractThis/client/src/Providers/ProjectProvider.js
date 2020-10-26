import React, { createContext, useState, useEffect } from 'react';

export const ProjectContext = createContext()

export function ProjectProvider(props) {
    const apiUrl = "/api/project";

    const [projects, setProjects] = useState([])

    const GetUsersProjects = (id) => {
        return fetch(`${apiUrl}/${id}`)
        .then((response) => response.json())
        .then(setProjects)
    }

    const AddNewProject = (projectObject) => {
        return fetch(`${apiUrl}`), {
            method: "POST",
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


    return (
        <ProjectContext.Provider
          value={{ projects, GetUsersProjects, AddNewProject, UpdateProject }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}



