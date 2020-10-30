import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { ProjectContext } from "../../../Providers/ProjectProvider"
import { WindowStateContext } from "../../../Providers/WindowStateProvider"
import ProjectComponentCard from "../ProjectComponentCard"
import ProjectComponentDetailCard from "../ProjectComponentDetailCard"
import ComponentForm from "../Forms/ComponentForm"
import ComponentEditForm from "../Forms/ComponentEditForm"
import { tsNullKeyword } from '@babel/types';


const ComponentAndDetails = (props) => {
    const [activeComponents, setActiveComponents] = useState([])

    const {
        displayProject, 
        DeleteComponent,
        update,
        setDisplayProject    
    } = useContext(ProjectContext)

    const {
        showComponentFormActive, setShowComponentFormActive,
        editFormOpen,setEditFormOpen, addImageWindowOpen, setAddImageWindowOpen
    } = useContext(WindowStateContext)

    const history = useHistory();

    useEffect(() => {
        if(displayProject !== undefined && displayProject.components !== undefined){
            readActiveComponents()
        }
    }, [displayProject])

    useEffect(() => {
        setDisplayProject(displayProject)
    }, [update])

    const readActiveComponents = () => {
        setActiveComponents(displayProject.components.filter((component) => (component.dateComplete === null)))        
        console.log("Active", activeComponents)
    }

    const cancelAdd = () => {
        setShowComponentFormActive(false);
        setEditFormOpen(false)
        props.setDisplayComponent();
    }

    const editComponent = () => {
        setShowComponentFormActive(true)
        setEditFormOpen(true)
    }
    
    const deleteThisComponent = (id) => {
        DeleteComponent(id)
    }

    const bigDetailPage = (id) => {
        history.push("/components")
    }

    const addImage = () => {
        setAddImageWindowOpen(!addImageWindowOpen)
    }
    
    const newOrEditForm = () => {

        if (!showComponentFormActive) {
            return (
                <div className="component_Detail_Container">
                    <h6>Details</h6>
                        {(props.displayComponent !== undefined) && 
                            <ProjectComponentDetailCard 
                                key={props.displayComponent.id}
                                displayComponent={props.displayComponent}
                                bigDetailPage={bigDetailPage}
                                deleteThisComponent={deleteThisComponent}
                                editComponent={editComponent}
                                addImage={addImage}
                            />
                        }
                </div> 
            )
        }
        else if (editFormOpen && showComponentFormActive) {
            return (
                <ComponentEditForm
                        cancelAdd={cancelAdd}
                        displayComponent={props.displayComponent}
                         />
                )
            }
        else if (!editFormOpen && showComponentFormActive)
            return (
                <ComponentForm
                    cancelAdd={cancelAdd} />
             )
            

    }

//Timing delay modifier for gsap effect on component cards
    let indexDelay = 1

    return (
        <>
            <div className="component_List_Container">
            <h6>Components
                <button className="fas fa-paint-roller project_Add" 
                        disabled={!props.addCompActive} 
                        onClick={() => {setShowComponentFormActive(!showComponentFormActive)}}
                >+</button>
            </h6>
                {(displayProject !== undefined && displayProject.components !== undefined) && activeComponents.map((component) =>
                    <ProjectComponentCard 
                        key={component.id}
                        component={component}
                        selectComponentDisplay={props.selectComponentDisplay}
                        indexDelay={indexDelay++}
                    />
                )}
            </div>
            
                {newOrEditForm()}                                    
            
        </>     
    )
}

export default ComponentAndDetails