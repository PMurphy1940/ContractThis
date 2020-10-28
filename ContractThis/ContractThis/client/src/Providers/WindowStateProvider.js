import React, { createContext, useState } from 'react';

export const WindowStateContext = createContext();

export function WindowStateProvider(props) {
    const [showSearchSubs, setShowSearchSubs] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [showComponentFormActive, setShowComponentFormActive] = useState(false);
    const [addCompActive, setAddCompActive] = useState(false);
    const [editProjectView, setEditProjectView] = useState(false)
    const [displayComponent, setDisplayComponent] = useState();



    return (
        <WindowStateContext.Provider
            value={{showSearchSubs, setShowSearchSubs,
                showProjectForm, setShowProjectForm,
                editFormOpen,setEditFormOpen,
                showComponentFormActive, setShowComponentFormActive,
                addCompActive, setAddCompActive,
                editProjectView, setEditProjectView,
                displayComponent, setDisplayComponent
            }}>
            {props.children}
        </WindowStateContext.Provider>
    )
}