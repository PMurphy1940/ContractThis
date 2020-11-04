import React, { useContext, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,  Button } from 'reactstrap';
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../../Providers/ComponentProvider";

const AddMaterial = (props) => {
    const [badName, setBadName] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [badCost, setBadCost] = useState(false);
    const [badQuantity, setBadQuantity] = useState(false);
    const { openAddMaterialModal } = useContext(WindowStateContext);
    const { displayComponent } = useContext(ComponentContext);
    const [material, setMaterial] = useState({
                                                materialName: "",
                                                cost: 0,
                                                quantityRequired: 0,
                                                notes: ""
                                            })

    const handleFieldChange = (event) => {
        const stateToChange = { ...material };
        stateToChange[event.target.id] = event.target.value;
        setMaterial(stateToChange);
        setSaveButtonClass("project_Save_Active");
        setBadCost(true);
        setBadQuantity(false);
        setBadName(false);
        };

    const SaveNewComponent = () => {
        //Form validation//
    
        if(displayProject!==undefined){
            material.cost = parseInt(material.cost)
                    //Check to see if the parseInt returned NaN//
            if ( material.cost !== Number(material.cost)){
                setBadCost(true)
                return
            }
            componentToAdd.projectId = displayProject.id;
            AddNewComponent(componentToAdd)
        }
        else window.alert("We're Sorry, you must have a project selected.")                                        
    }
  return (
    <div >
      <Modal isOpen={openAddMaterialModal}>
          <ModalHeader >Add To The Shopping list for  {displayComponent.componentName}</ModalHeader>
          <ModalBody>
              <fieldset className="componentForm form">
                        <label htmlFor="materialName" className="form_input">Material Name</label>
                        <input
                            id="materialName"
                            className="form_input"
                            innerref="materialName"
                            onChange={ (e) => handleFieldChange(e)}
                            value={material.materialName}
                        />
                        {(badName) ? <p className="required">Material name required</p> : <p> </p>}
                        <label htmlFor="cost" className="form_input">Unit cost</label>
                        <input
                            id="cost"
                            className="form_input"
                            innerref="cost"
                           
                            onChange={ (e) => handleFieldChange(e)}
                            value={material.cost}
                        />
                        {(badCost) ? <p className="required">Unit cost required</p> : <p> </p>}
                        <label htmlFor="quantityRequired" className="form_input">Quantity required</label>
                        <input
                            id="quantityRequired"
                            className="form_input"
                            innerref="quantityRequired"
                            onChange={ (e) => handleFieldChange(e)}
                            value={material.quantityRequired}
                        />
                        {(badQuantity) ? <p className="required">Quantity must be a number</p> : <p></p>}
                        <label htmlFor="notes" className="form_input">Notes</label>
                        <textarea
                            id="notes"
                            className="form_input"
                            rows="3"
                            innerref="notes"
                            onChange={ (e) => handleFieldChange(e)}
                            value={material.notes}
                        />
                    </fieldset>
          </ModalBody>
          <ModalFooter>
          <Button color="primary" onClick={() => props.cancelAdd()}>Cancel</Button>{' '}
          <Button color="primary" disabled={saveButton} onClick={() => props.addMaterial()}>Add</Button>{' '}
          </ModalFooter>
      </Modal>
    </div>
  )
  }
export default AddMaterial