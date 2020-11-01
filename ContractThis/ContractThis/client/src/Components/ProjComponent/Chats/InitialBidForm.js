import React, { useState, useContext } from 'react';
import { ComponentContext } from "../../../Providers/ComponentProvider"
import { BidContext } from "../../../Providers/BidProvider"
import FadeIn from "../../../Helpers/FadeIn";
import LocalUserProvider from "../../../Helpers/LocalUserGets"


const InitialBidForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save")
    const [bidToAdd, setBidToAdd] = useState({ 
                                            fee: "", 
                                            ownerComment: "", 
                                        })

    const { OpenBid, selectedContractor } = useContext(BidContext);

    const { displayComponent } =useContext(ComponentContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...bidToAdd };
        stateToChange[event.target.id] = event.target.value;
        setBidToAdd(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
      };

    const NewBid = () => {
        bidToAdd.fee = parseInt(bidToAdd.fee)
        bidToAdd.ProjectComponentId = displayComponent.id;
        bidToAdd.UserProfileId = LocalUserProvider.userId();
        bidToAdd.SubContractorId = selectedContractor.id
        OpenBid(bidToAdd)
     };

    return (
        <FadeIn
        paused="true"
        direction='up'
        distance='1000'
        >
            <div className="large_Component_Detail_Images_Card">
                <h4 className="Images_Banner">Contact
                    <div>
                        <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => NewBid() }/>
                        <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                    </div>            
                </h4>
                <div className="images_Container_Large">
                    <div>
                        <div className="search_Top">
                            <fieldset className="initialChat_Form form">
                                    <label htmlFor="fee" className="form_input">Budget (How much are you willing to spend?)</label>
                                    <input
                                        id="fee"
                                        className="form_input"
                                        innerref="fee"
                                        onChange={ (e) => handleFieldChange(e)}
                                        value={bidToAdd.fee}
                                    />
                                    <label htmlFor="ownerComment" className="form_input">Message</label>
                                    <textarea
                                        id="ownerComment"
                                        className="form_input"
                                        innerref="ownerComment"
                                        rows="4"
                                        onChange={ (e) => handleFieldChange(e)}
                                        value={bidToAdd.ownerComment}
                                    />
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn> 
    )
}

export default InitialBidForm
