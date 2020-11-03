import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ProjectForm = (props) => {
    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("project_Save")
    const [projNameReq, setProjNameReq] = useState(false);
    const [projDescReq, setProjDescReq] = useState(false);
    const [badNumbers, setBadNumbers] = useState(false);
    const [projectToAdd, setProjectToAdd] = useState({ 
                                            projectName: "", 
                                            locationName: "", 
                                            locationAddress: "", 
                                            projectDescription: "", 
                                            budget: "", 
                                            imageLocation: ""
                                        })

    const {
        AddNewProject
    } =useContext(ProjectContext)

 

    const handleFieldChange = (event) => {
        const stateToChange = { ...projectToAdd };
        stateToChange[event.target.id] = event.target.value;
        setProjectToAdd(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
        setProjNameReq(false);
        setProjDescReq(false);
        setBadNumbers(false);
      };

    const SaveNewProject = () => {
        //Form validation//
        if (projectToAdd.projectName === ""){
            setProjNameReq(true)
            return
        }
        if (projectToAdd.projectDescription === ""){
            setProjDescReq(true)
            return
        }

        projectToAdd.budget = parseInt(projectToAdd.budget)
        //Check to see if the parseInt returned NaN//
        if ( projectToAdd.budget !== Number(projectToAdd.budget)){
            setBadNumbers(true)
            return
        }
        AddNewProject(projectToAdd)
     };

    return (
        <>
        <div className="project_Add_New_Form">
                    <FadeIn
                        paused="true"
                        direction='right'
                        distance='600'
                            >
                        <h6 className="add_Project_Banner">Add New Project
                            <div>
                                <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveNewProject() }/>
                                <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                            </div>
                        </h6>
                            <fieldset className="projectForm form">
                                <label htmlFor="projectName" className="form_input">Project Name</label>
                                <input
                                    id="projectName"
                                    className="form_input"
                                    innerref="projectName"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.projectName}
                                />
                                {(projNameReq) ? <p className="required">Project name required</p> : <p> </p>}
                                <label htmlFor="locationName" className="form_input">Location Name</label>
                                <input
                                    id="locationName"
                                    className="form_input"
                                    innerref="locationName"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.locationName}
                                />
                                <label htmlFor="locationAddress" className="form_input">Location Address</label>
                                <input
                                    id="locationAddress"
                                    className="form_input"
                                    innerref="locationAddress"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.locationAddress}
                                />
                                <label htmlFor="projectDescription" className="form_input">Project Description</label>
                                <textarea
                                    id="projectDescription"
                                    className="form_input"
                                    rows="4"
                                    innerref="projectDescription"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.projectDescription}
                                />
                                {(projDescReq) ? <p className="required">Project description required</p> : <p></p>}
                                <label htmlFor="budget" className="form_input">budget</label>
                                <input
                                    id="budget"
                                    className="form_input"
                                    innerref="budget"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.budget}
                                />
                                {(badNumbers) ? <p className="required">Budget must be a number</p> : <p></p>}
                                <label htmlFor="imageLocation" className="form_input">Image Location</label>
                                <input
                                    id="imageLocation"
                                    className="form_input"
                                    innerref="imageLocation"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.imageLocation}
                                />

                            </fieldset>
                    </FadeIn>
                </div>
        </>
    )
}

export default ProjectForm