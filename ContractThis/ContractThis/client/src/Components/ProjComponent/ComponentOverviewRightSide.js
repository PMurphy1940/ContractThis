import React, { useContext } from 'react';
import SearchSubcontractor from "../Subcontractor/SearchSubcontractors";
import SubContractorChat from "./Chats/SubContractorChat";
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../../Providers/ComponentProvider"
import { ChatContext } from "../../Providers/ChatProvider";
import InitialChatForm from "./Chats/InitialChatForm"
import DetailedComponentCard from "./DetailedComponentCard"


const ComponentOverviewRightSide = (props) => {
    const { initialChatFormActive, setInitialChatFormActive, chatWindow, setChatWindow} = useContext(WindowStateContext)
    const {
        displayComponent, setDisplayComponent
    } = useContext(ComponentContext)

    const firstConversation = (id) => {
        setInitialChatFormActive(true);
    }
    console.log("comp", displayComponent)

    const subcontractorChat = () => {
        if (initialChatFormActive) {
            return (
                <InitialChatForm />
            )
        }
        else {
            return (
                <SubContractorChat />
            )
        }
    }
    return (
        <div className="com_Detail_Container">
            <h6>Details---
            {(displayComponent!==undefined) && displayComponent.componentName}</h6>
            {(displayComponent!==undefined) && 
                <DetailedComponentCard
                    displayComponent={displayComponent} />   
            }
        </div>
    )
}

export default ComponentOverviewRightSide
{/* <div className="large_Component_List_Container">
                <SearchSubcontractor
                    firstConversation={firstConversation} />
            </div>
            <div>
                {subcontractorChat()}
            </div> */}