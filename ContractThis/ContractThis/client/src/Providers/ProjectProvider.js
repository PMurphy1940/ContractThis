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

    return (
        <ProjectContext.Provider
          value={{ projects, GetUsersProjects }}>         
             {props.children}           
        </ProjectContext.Provider>
      );
}



