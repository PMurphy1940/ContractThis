import React, { createContext, useState } from 'react';

export const WindowStateContext = createContext();

export function WindowStateProvider(props) {
    const [showSearchSubs, setShowSearchSubs] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [showComponentFormActive, setShowComponentFormActive] = useState(false);
    const [addCompActive, setAddCompActive] = useState(false);
    const [editProjectView, setEditProjectView] = useState(false);
    const [bidWindow, setBidWindow] = useState(false);
    const [initialBidFormActive, setInitialBidFormActive] =useState(false)
    const [addImageWindowOpen, setAddImageWindowOpen] = useState(false);
    const [showImages, setShowImages] = useState(true);
    const [viewShoppingList, setViewShoppingList] = useState(true);
    const [showBigShoppingList, setShowBigShoppingList] = useState(false);




    return (
        <WindowStateContext.Provider
            value={{showSearchSubs, setShowSearchSubs,
                showProjectForm, setShowProjectForm,
                editFormOpen,setEditFormOpen,
                showComponentFormActive, setShowComponentFormActive,
                addCompActive, setAddCompActive,
                editProjectView, setEditProjectView,
                bidWindow, setBidWindow,
                initialBidFormActive, setInitialBidFormActive,
                addImageWindowOpen, setAddImageWindowOpen,
                showImages, setShowImages,
                viewShoppingList, setViewShoppingList,
                showBigShoppingList, setShowBigShoppingList
            }}>
            {props.children}
        </WindowStateContext.Provider>
    )
}