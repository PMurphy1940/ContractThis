import React, { useState, useContext } from 'react';
import { ProjectContext } from "../../../Providers/ProjectProvider"
import FadeIn from "../../../Helpers/FadeIn"

const ComponentForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save");
    const [comNameReq, setComNameReq] = useState(false);
    const [comDescReq, setComDescReq] = useState(false);
    const [badNumbers, setBadNumbers] = useState(false);

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
        setSaveButtonClass("project_Save_Active");
        setSaveButton(true);
        setComNameReq(false);
        setComDescReq(false);
      };

    const SaveNewComponent = () => {
        //Form validation//
        if (componentToAdd.componentName === ""){
            setComNameReq(true)
            return
        }
        if (componentToAdd.componentDescription === ""){
            setComDescReq(true)
            return
        }
        if(displayProject!==undefined){
            componentToAdd.materialCost = parseInt(componentToAdd.materialCost)
                    //Check to see if the parseInt returned NaN//
            if ( componentToAdd.materialCost !== Number(componentToAdd.materialCost)){
                setBadNumbers(true)
                return
            }
            componentToAdd.projectId = displayProject.id;
            AddNewComponent(componentToAdd)
        }
        else window.alert("We're Sorry, you must have a project selected.")
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
                        {(comNameReq) ? <p className="required">Component name required</p> : <p> </p>}
                        <label htmlFor="componentDescription" className="form_input">Description</label>
                        <textarea
                            id="componentDescription"
                            className="form_input"
                            innerref="componentDescription"
                            rows="4"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToAdd.componentDescription}
                        />
                        {(comDescReq) ? <p className="required">Component description required</p> : <p> </p>}
                        <label htmlFor="materialCost" className="form_input">Material Cost</label>
                        <input
                            id="materialCost"
                            className="form_input"
                            innerref="materialCost"
                            onChange={ (e) => handleFieldChange(e)}
                            value={componentToAdd.materialCost}
                        />
                        {(badNumbers) ? <p className="required">Material cost must be a number</p> : <p></p>}

                    </fieldset>
                </FadeIn>
            </div>
    )
}

export default ComponentForm
