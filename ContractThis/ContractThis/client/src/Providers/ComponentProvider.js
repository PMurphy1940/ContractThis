import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileProvider"
import { ProjectContext } from "./ProjectProvider"
import { WindowStateContext } from "../Providers/WindowStateProvider"

export const ComponentContext = createContext()

export function ComponentProvider(props) {
    const apiUrl = "/api/component";
    const [images, setImages] = useState([])
    const [displayComponent, setDisplayComponent] = useState();
    const [update, setUpdate] = useState(false);
    const { getToken } = useContext(ProfileContext)
    const { setAddImageWindowOpen, setShowComponentFormActive } = useContext(WindowStateContext);
    const { GetProjectById, displayProject } = useContext(ProjectContext);

    const GetComponentImages = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/images/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then((response) => response.json()
        .then(setImages))
    }

    const AddNewImage = (imageObject) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/images`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(imageObject)
        }))
        .then((response) => {
            if (response.ok) {
                setAddImageWindowOpen(false)
                GetComponentImages(imageObject.ProjectComponentId)
                return;
            }
            window.alert(new Error("Unable to complete request"));
          });  
    }

    const GetComponentById = (id) => {
        getToken().then((token)=> 
        fetch(`${apiUrl}/single/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then(setDisplayComponent)
        )
    }

    const AddNewComponent = (componentObject) => {
      getToken().then((token) => 
        fetch(`${apiUrl}`, {
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
              return response.json();
            }
            window.alert(new Error("Unable to complete request"));
          });    
    }

    const UpdateComponent = (updatedComponent, id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/${id}`, {
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
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then(() => {
        GetProjectById(displayProject.id);
        setDisplayComponent();
      })
    }

    const AddCompletedDateToComponent = (completeComponent) =>{
        getToken().then((token) =>
        fetch(`${apiUrl}/completed/${displayComponent.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(completeComponent)
        }))
        .then((response) => {
            if (response.ok) {
              GetProjectById(completeComponent.projectId);
              setDisplayComponent();
                  return
            }
            window.alert(new Error("Unable to complete request"));
      })
    }

    const AddNewMaterial = (materialObject) => {
      getToken().then((token) =>
      fetch(`api/material/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(materialObject)
      }))
      .then((response) => {
        if (response.ok) {
          GetComponentById(materialObject.projectComponentId);
              return
        }
        window.alert(new Error("Unable to complete request"));
      })
    }


    return (
        <ComponentContext.Provider
          value={{ images, displayComponent, setDisplayComponent, GetComponentImages,
                     AddNewImage, GetComponentById, AddCompletedDateToComponent, DeleteComponent,
                     AddNewMaterial }}>         
             {props.children}           
        </ComponentContext.Provider>
      );
}




