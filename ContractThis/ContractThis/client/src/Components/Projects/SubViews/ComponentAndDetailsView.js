import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { ProjectContext } from "../../../Providers/ProjectProvider"
import { WindowStateContext } from "../../../Providers/WindowStateProvider"
import { ComponentContext } from "../../../Providers/ComponentProvider";
import ProjectComponentCard from "../ProjectComponentCard"
import ProjectComponentDetailCard from "../ProjectComponentDetailCard"
import ComponentForm from "../Forms/ComponentForm"
import ComponentEditForm from "../Forms/ComponentEditForm"
import DeleteComponentModal from "../../Modals/DeleteComponentModal";

const ComponentAndDetails = (props) => {
    const [activeComponents, setActiveComponents] = useState([])

    const {
        displayProject, 
        update,
        setDisplayProject    
    } = useContext(ProjectContext)

    const { displayComponent, setDisplayComponent, DeleteComponent } = useContext(ComponentContext);

    const {
        showComponentFormActive, setShowComponentFormActive,
        editFormOpen,setEditFormOpen, addImageWindowOpen, setAddImageWindowOpen,
        openDeleteModal, setOpenDeleteModal
    } = useContext(WindowStateContext)

    const history = useHistory();

    useEffect(() => {
        if(displayProject !== undefined && displayProject.components !== undefined){
            let updatedProject = {...displayProject}
            let newComponents = updatedProject.components.filter((component) => (component.dateComplete === null))
            setActiveComponents(newComponents)  
        }
    }, [displayProject])

    useEffect(() => {
        setDisplayProject(displayProject)
    }, [update])

    const cancelAdd = () => {
        setShowComponentFormActive(false);
        setEditFormOpen(false)
        setDisplayComponent();
    }

    const editComponent = () => {
        setShowComponentFormActive(true)
        setEditFormOpen(true)
    }
    
    const deleteThisComponent = () => {
        setOpenDeleteModal(true)
    }

    const completeDelete = () => {
        DeleteComponent(props.displayComponent.id)
        setOpenDeleteModal(false)
        setDisplayComponent();
    }

    const cancelDelete = () => {
        setOpenDeleteModal(false)
    }

    const bigDetailPage = (id) => {
        history.push("/components")
    }

    const addImage = () => {
        setAddImageWindowOpen(!addImageWindowOpen)
    }
    //This returns the Details view of the selected component, or swaps it out for the 
    //New Component form <or> the Edit Component form
    const newOrEditForm = () => {
        if (!showComponentFormActive) {
            return (
                <div className="component_Detail_Container">
                    <h6>Details</h6>
                        {(displayComponent !== undefined) && 
                            <ProjectComponentDetailCard 
                                key={displayComponent.id}
                                displayComponent={displayComponent}
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

    //This is the main return for the Component List in the center of the page. It also holds the
    //conditional for the Right Side details <or> the New/Edit form and the 
    //Route to the confirm DELETE Modal window.
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
                {(displayComponent!== undefined) && 
                    <DeleteComponentModal
                        openDeleteModal={openDeleteModal}
                        completeDelete={completeDelete}
                        cancelDelete={cancelDelete}
                        />
                }                                   
        </>     
    )
}

export default ComponentAndDetails