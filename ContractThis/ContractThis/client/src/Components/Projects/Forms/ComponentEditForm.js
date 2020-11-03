import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"
import { WindowStateContext } from "../../../Providers/WindowStateProvider"

const ComponentEditForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save")
    const [componentToEdit, setComponentToEdit] = useState({...props.displayComponent});
    const [comNameReq, setComNameReq] = useState(false);
    const [comDescReq, setComDescReq] = useState(false);
    const [badNumbers, setBadNumbers] = useState(false);


    const {
        showComponentFormActive, setShowComponentFormActive,
        editFormOpen,setEditFormOpen,
    } = useContext(WindowStateContext)
    
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
        setComNameReq(false);
        setComDescReq(false);
        setComDescReq(false);
      };

    const SaveComponent = () => {
        //Form validation//
        if (componentToEdit.componentName === ""){
            setComNameReq(true)
            return
        }
        if (componentToEdit.componentDescription === ""){
            setComDescReq(true)
            return
        }
        let id = componentToEdit.id
        componentToEdit.materialCost = parseInt(componentToEdit.materialCost)
            //Check to see if the parseInt returned NaN//
            if ( componentToEdit.materialCost !== Number(componentToEdit.materialCost)){
            setBadNumbers(true)
            return
        }
        UpdateComponent(componentToEdit, id)
        setShowComponentFormActive(false);
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
                        {(comNameReq) ? <p className="required">Component name required</p> : <p> </p>}
                        <label htmlFor="componentDescription" className="form_input">Description</label>
                        <textarea
                            id="componentDescription"
                            className="form_input"
                            innerref="componentDescription"
                            rows="4"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToEdit.componentDescription}
                        />
                        {(comDescReq) ? <p className="required">Component description required</p> : <p> </p>}
                        <label htmlFor="materialCost" className="form_input">Material Cost</label>
                        <input
                            id="materialCost"
                            className="form_input"
                            innerref="materialCost"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToEdit.materialCost}
                        />
                        {(badNumbers) ? <p className="required">Material cost must be a number</p> : <p></p>}
                    </fieldset>
                </FadeIn>
            </div>
    )
}

export default ComponentEditForm
