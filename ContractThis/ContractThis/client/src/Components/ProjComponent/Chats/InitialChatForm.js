import React, { useState, useContext } from 'react';
import { ComponentContext } from "../../../Providers/ComponentProvider"
import { ChatContext } from "../../../Providers/ChatProvider"
import FadeIn from "../../../Helpers/FadeIn"

const InitialChatForm = (props) => {

    const [saveButton, setSaveButton] = useState(false);
    const [saveButtonClass, setSaveButtonClass] = useState("component_Save")
    const [chatToAdd, setChatToAdd] = useState({ 
                                            fee: "", 
                                            ownerComment: "", 
                                        })

    const { OpenConversation } = useContext(ChatContext);

    const {
        displayComponent
    } =useContext(ComponentContext)

    const handleFieldChange = (event) => {
        const stateToChange = { ...chatToAdd };
        stateToChange[event.target.id] = event.target.value;
        setChatToAdd(stateToChange);
        setSaveButtonClass("project_Save_Active")
        setSaveButton(true);
      };

    console.log("Display", displayComponent)

    const NewChat = () => {
        chatToAdd.fee = parseInt(chatToAdd.fee)
        chatToAdd.ProjectComponentId = displayComponent.id;
        OpenConversation(chatToAdd)
     };
    return (
            <div className="component_Detail_Container">
                <FadeIn
                    paused="true"
                    direction='right'
                    distance='600'
                    >
                    <h6 className="add_Component_Banner">Contact Subcontractor
                        <div>
                            <button id={saveButtonClass} disabled={!saveButton} className="far fa-check-circle" onClick={() => NewChat() }/>
                            <button className="fas fa-minus-circle project_Cancel" onClick={() => props.cancelAdd() }/>
                        </div>
                    </h6>
                    <fieldset className="initialChat_Form form">
                        <label htmlFor="fee" className="form_input">Budget (How much are you willing to spend?)</label>
                        <input
                            id="fee"
                            className="form_input"
                            innerref="fee"
                            onChange={ (e) => handleFieldChange(e)}
                            value={chatToAdd.fee}
                        />
                        <label htmlFor="ownerComment" className="form_input">Message</label>
                        <textarea
                            id="ownerComment"
                            className="form_input"
                            innerref="ownerComment"
                            rows="4"
                            onChange={ (e) => handleFieldChange(e)}
                            value={chatToAdd.ownerComment}
                        />
                    </fieldset>
                </FadeIn>
            </div>
    )
}

export default InitialChatForm
