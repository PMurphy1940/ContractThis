import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider"

export const ChatContext = createContext();

export function ChatProvider(props) {
    const [chat, setChat] = useState()


    const apiUrl = "api/chat";
    const { getToken } = useContext(ProfileContext);

    const GetChatByComponentId = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${id}`
            }
        }))
        .then((response) => response.json()
        .then(setChat))
    }

    const OpenConversation = (bidObject) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/begin`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "json/application"
            },
            body: JSON.stringify(bidObject)
        }))
    }


    return (
        <ChatContext.Provider
            value={{ chat, setChat, GetChatByComponentId, OpenConversation
            }}>
            {props.children}
        </ChatContext.Provider>
    )
}