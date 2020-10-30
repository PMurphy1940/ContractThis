import React, { useContext } from 'react';
import SearchSubcontractor from "../Subcontractor/SearchSubcontractors";
import SubContractorChat from "./Chats/SubContractorChat";
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ChatContext } from "../../Providers/ChatProvider";
import InitialChatForm from "./Chats/InitialChatForm"

const ComponentOverviewRightSide = (props) => {
    const { initialChatFormActive, setInitialChatFormActive, chatWindow, setChatWindow} = useContext(WindowStateContext)

    const firstConversation = (id) => {
        setInitialChatFormActive(true);
    }

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
        <div className="large_Detail_Container">
            <h6>Details</h6>
            <div className="large_Component_List_Container">
                <SearchSubcontractor
                    firstConversation={firstConversation} />
            </div>
            <div>
                {subcontractorChat()}
            </div>
        </div>
    )
}

export default ComponentOverviewRightSide