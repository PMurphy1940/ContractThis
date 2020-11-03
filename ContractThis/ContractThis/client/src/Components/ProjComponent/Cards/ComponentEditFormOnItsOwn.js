import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { ProjectContext } from "../../../Providers/ProjectProvider"
import { ComponentContext } from "../../../Providers/ComponentProvider"

const ComponentEditFormOnItsOwn = (props) => {
    const { Id } = useParams();
    const history = useHistory()
    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save");
    const [comNameReq, setComNameReq] = useState(false);
    const [comDescReq, setComDescReq] = useState(false);
    const [badNumbers, setBadNumbers] = useState(false);

    const { GetComponentById, displayComponent, setDisplayComponent } = useContext(ComponentContext)

    useEffect(() => {
        GetComponentById(Id)
    }, [])

    useEffect(()=> {

        if (displayComponent !== undefined && displayComponent.title === "Not Found"){
            history.push("/notfound")
        }
    }, [displayComponent])

    const {
        UpdateComponent
    } =useContext(ProjectContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...displayComponent };
        stateToChange[event.target.id] = event.target.value;
        setDisplayComponent(stateToChange);
        setSaveButton(true)
        setComNameReq(false);
        setComDescReq(false);
        setBadNumbers(false);
        setSaveButtonClass("project_Save_Active")
      };

    const SaveComponent = () => {
        //Form validation//
        if (displayComponent.componentName === ""){
            setComNameReq(true)
            return
        }
        if (displayComponent.componentDescription === ""){
            setComDescReq(true)
            return
        }
        let id = displayComponent.id
        displayComponent.materialCost = parseInt(displayComponent.materialCost)
         //Check to see if the parseInt returned NaN//
         if ( displayComponent.materialCost !== Number(displayComponent.materialCost)){
            setBadNumbers(true)
            return
        }
        UpdateComponent(displayComponent, id);
        history.push("/components")
     };
    return (
        <>
        {(displayComponent!==undefined) && 
            <div className="component_Detail_Container">
                    <h6 className="add_Component_Banner">Edit
                        <div>
                            <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => SaveComponent() }/>
                            <button className="fas fa-minus-circle project_Cancel" onClick={() => history.goBack() }/>
                        </div>
                    </h6>
                    <fieldset className="projectForm form">
                        <label htmlFor="componentName" className="form_input">Component Name</label>
                        <input
                            id="componentName"
                            className="form_input"
                            innerref="componentName"
                            onChange={ (e) => handleFieldChange(e)}
                            value={displayComponent.componentName}
                        />
                        {(comNameReq) ? <p className="required">Component name required</p> : <p> </p>}
                        <label htmlFor="componentDescription" className="form_input">Description</label>
                        <textarea
                            id="componentDescription"
                            className="form_input"
                            innerref="componentDescription"
                            rows="4"
                            onChange={ (e) => handleFieldChange(e)}
                            value={displayComponent.componentDescription}
                        />
                        {(comDescReq) ? <p className="required">Component description required</p> : <p> </p>}
                        <label htmlFor="materialCost" className="form_input">Material Cost</label>
                        <input
                            id="materialCost"
                            className="form_input"
                            innerref="materialCost"
                            onChange={ (e) => handleFieldChange(e)}
                            value={displayComponent.materialCost}
                        />
                        {(badNumbers) ? <p className="required">Material cost must be a number</p> : <p></p>}
                    </fieldset>
            </div>}
            </>
    )
}

export default ComponentEditFormOnItsOwn
