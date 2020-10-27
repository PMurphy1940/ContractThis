import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ComponentForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save")
    const [componentToAdd, setComponentToAdd] = useState({ 
                                            componentName: "", 
                                            componentDescription: "", 
                                            materialCost: "", 
                                        })

    const {
        AddNewComponent,
        displayProject
    } =useContext(ProjectContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...componentToAdd };
        stateToChange[event.target.id] = event.target.value;
        setComponentToAdd(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
      };

    const SaveNewComponent = () => {
        componentToAdd.materialCost = parseInt(componentToAdd.materialCost)
        componentToAdd.projectId = displayProject.id;
        AddNewComponent(componentToAdd)
     };
    return (
            <div className="component_Detail_Container">
                <FadeIn
                    paused="true"
                    direction='right'
                    distance='600'
                    >
                    <h6 className="add_Component_Banner">Add New
                        <div>
                            <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveNewComponent() }/>
                            <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                        </div>
                    </h6>
                    <fieldset className="projectForm form">
                        <label htmlFor="componentName" className="form_input">New Component Name</label>
                        <input
                            id="componentName"
                            className="form_input"
                            innerref="componentName"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToAdd.componentName}
                        />
                        <label htmlFor="componentDescription" className="form_input">Description</label>
                        <input
                            id="componentDescription"
                            className="form_input"
                            innerref="componentDescription"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToAdd.componentDescription}
                        />
                        <label htmlFor="materialCost" className="form_input">Material Cost</label>
                        <input
                            id="materialCost"
                            className="form_input"
                            innerref="materialCost"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToAdd.materialCost}
                        />
                    </fieldset>
                </FadeIn>
            </div>
    )
}

export default ComponentForm
