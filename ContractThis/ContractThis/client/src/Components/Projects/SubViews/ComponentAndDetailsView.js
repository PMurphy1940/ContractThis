import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import { ProfileContext } from "../../../Providers/ProfileProvider"
import ProjectComponentCard from "../ProjectComponentCard"
import ProjectComponentDetailCard from "../ProjectComponentDetailCard"
import ComponentForm from "../Forms/ComponentForm"
import FadeIn from "../../../Helpers/FadeIn"


const ComponentAndDetails = (props) => {
    const [showComponentFormActive, setShowComponentFormActive] = useState(false)

    const {
        projects, 
        GetUsersProjects
    } = useContext(ProjectContext)

    const {
        getUserById,
        aUser
    } = useContext(ProfileContext)

    const cancelAdd = () => {
        setShowComponentFormActive(false)
    }
    

//Timing delay modifier for gsap effect on component cards
    let indexDelay = 1

    return (
        <>
            <div className="component_List_Container">
            <h6>Components
                <button className="fas fa-paint-roller project_Add" 
                        disabled={!props.addCompActive} 
                        onClick={() => {setShowComponentFormActive(true)}}
                >+</button>
            </h6>
                {(props.displayProject !== undefined && props.displayProject.components !== undefined) && props.displayProject.components.map((component) =>
                    <ProjectComponentCard 
                        key={component.id}
                        component={component}
                        selectComponentDisplay={props.selectComponentDisplay}
                        indexDelay={indexDelay++}
                        
                    />
                )}
            </div>
            {(!showComponentFormActive) ? 
            <div className="component_Detail_Container">
                <h6>Details</h6>
                    {(props.displayComponent !== undefined) && 
                        <ProjectComponentDetailCard 
                            key={props.displayComponent.id}
                            displayComponent={props.displayComponent}
                        />
                    }
            </div> 
            :
            <div className="component_Detail_Container">
                <FadeIn
                    paused="true"
                    direction='right'
                    distance='600'
                    >
                        <h6>Add New Project</h6>
                        <ComponentForm
                            cancelAdd={cancelAdd} />                        
                </FadeIn>
            </div>
            }
        </>     
    )
}

export default ComponentAndDetails