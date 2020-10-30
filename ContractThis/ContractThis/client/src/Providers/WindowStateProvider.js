import React, { createContext, useState } from 'react';

export const WindowStateContext = createContext();

export function WindowStateProvider(props) {
    const [showSearchSubs, setShowSearchSubs] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [showComponentFormActive, setShowComponentFormActive] = useState(false);
    const [addCompActive, setAddCompActive] = useState(false);
    const [editProjectView, setEditProjectView] = useState(false);
    const [chatWindow, setChatWindow] = useState(false);
    const [initialChatFormActive, setInitialChatFormActive] =useState(false)
    const [addImageWindowOpen, setAddImageWindowOpen] = useState(false);




    return (
        <WindowStateContext.Provider
            value={{showSearchSubs, setShowSearchSubs,
                showProjectForm, setShowProjectForm,
                editFormOpen,setEditFormOpen,
                showComponentFormActive, setShowComponentFormActive,
                addCompActive, setAddCompActive,
                editProjectView, setEditProjectView,
                chatWindow, setChatWindow,
                initialChatFormActive, setInitialChatFormActive,
                addImageWindowOpen, setAddImageWindowOpen
            }}>
            {props.children}
        </WindowStateContext.Provider>
    )
}