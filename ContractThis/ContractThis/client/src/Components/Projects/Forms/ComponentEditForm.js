import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ComponentEditForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save")
    const [componentToEdit, setComponentToEdit] = useState({...props.displayComponent})

    const {
        AddNewComponent,
        displayProject,
        UpdateComponent
    } =useContext(ProjectContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...componentToEdit };
        stateToChange[event.target.id] = event.target.value;
        setComponentToEdit(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
      };

    const SaveComponent = () => {
        let id = componentToEdit.id
        componentToEdit.materialCost = parseInt(componentToEdit.materialCost)
        UpdateComponent(componentToEdit, id)
     };
    return (
            <div className="component_Detail_Container">
                <FadeIn
                    paused="true"
                    direction='right'
                    distance='600'
                    >
                    <h6 className="add_Component_Banner">Edit
                        <div>
                            <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveComponent() }/>
                            <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                        </div>
                    </h6>
                    <fieldset className="projectForm form">
                        <label htmlFor="componentName" className="form_input">Component Name</label>
                        <input
                            id="componentName"
                            className="form_input"
                            innerref="componentName"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToEdit.componentName}
                        />
                        <label htmlFor="componentDescription" className="form_input">Description</label>
                        <textarea
                            id="componentDescription"
                            className="form_input"
                            innerref="componentDescription"
                            rows="4"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToEdit.componentDescription}
                        />
                        <label htmlFor="materialCost" className="form_input">Material Cost</label>
                        <input
                            id="materialCost"
                            className="form_input"
                            innerref="materialCost"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToEdit.materialCost}
                        />
                    </fieldset>
                </FadeIn>
            </div>
    )
}

export default ComponentEditForm
