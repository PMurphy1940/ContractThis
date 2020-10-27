import React, { useState, useContext } from 'react';
import { Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap'
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ProjectForm = (props) => {
    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("project_Save")
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
      };

    const SaveNewProject = () => {
        projectToAdd.budget = parseInt(projectToAdd.budget)
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
                        <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveNewProject() }/>
                        <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
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
                                <input
                                    id="projectDescription"
                                    className="form_input"
                                    type="textarea"
                                    rows="4"
                                    innerref="projectDescription"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.projectDescription}
                                />
                                <label htmlFor="budget" className="form_input">budget</label>
                                <input
                                    id="budget"
                                    className="form_input"
                                    innerref="budget"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToAdd.budget}
                                />
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