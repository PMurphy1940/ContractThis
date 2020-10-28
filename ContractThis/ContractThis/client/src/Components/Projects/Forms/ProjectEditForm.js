import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ProjectEditForm = (props) => {
    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("project_Save")
    const [projectToEdit, setProjectToEdit] = useState({...props.displayProject})

    const {
        UpdateProject
    } =useContext(ProjectContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...projectToEdit };
        stateToChange[event.target.id] = event.target.value;
        setProjectToEdit(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
      };

    const SaveEditedProject = () => {
        projectToEdit.budget = parseInt(projectToEdit.budget)
        UpdateProject(projectToEdit)
     };

    return (
        <>
        <div className="project_Add_New_Form">
                    <FadeIn
                        paused="true"
                        direction='right'
                        distance='600'
                            >
                        <h6 className="add_Project_Banner">Edit Project
                            <div>
                                <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveEditedProject() }/>
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
                                    value={projectToEdit.projectName}
                                />
                                <label htmlFor="locationName" className="form_input">Location Name</label>
                                <input
                                    id="locationName"
                                    className="form_input"
                                    innerref="locationName"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToEdit.locationName}
                                />
                                <label htmlFor="locationAddress" className="form_input">Location Address</label>
                                <input
                                    id="locationAddress"
                                    className="form_input"
                                    innerref="locationAddress"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToEdit.locationAddress}
                                />
                                <label htmlFor="projectDescription" className="form_input">Project Description</label>
                                <textarea
                                    id="projectDescription"
                                    className="form_input"
                                    rows="4"
                                    innerref="projectDescription"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToEdit.projectDescription}
                                />
                                <label htmlFor="budget" className="form_input">budget</label>
                                <input
                                    id="budget"
                                    className="form_input"
                                    innerref="budget"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToEdit.budget}
                                />
                                <label htmlFor="imageLocation" className="form_input">Image Location</label>
                                <input
                                    id="imageLocation"
                                    className="form_input"
                                    innerref="imageLocation"
                                    onChange={ (e) => handleFieldChange(e)}
                                    value={projectToEdit.imageLocation}
                                />

                            </fieldset>
                    </FadeIn>
                </div>
        </>
    )
}

export default ProjectEditForm