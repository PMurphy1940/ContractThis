import React, { useContext } from 'react';
import SubContractorChat from "./Chats/SubContractorChat";
import { WindowStateContext } from "../../Providers/WindowStateProvider";
import { ComponentContext } from "../../Providers/ComponentProvider"
import { BidContext } from "../../Providers/BidProvider";
import { SubContractorContext } from "../../Providers/SubContractorProvider";
import InitialBidForm from "./Chats/InitialBidForm"
import DetailedComponentCard from "./DetailedComponentCard"


const ComponentOverviewRightSide = (props) => {
    const { initialBidFormActive, setInitialBidFormActive, bidWindow, setBidWindow, 
            showSearchSubs, setShowSearchSubs} = useContext(WindowStateContext);

    const { GetSubContractorsById, singleSubContractor } = useContext(SubContractorContext);      
    const {
        displayComponent, setDisplayComponent
    } = useContext(ComponentContext);


    return (
        <div className="com_Detail_Container">
            <h6>Details---
            {(displayComponent!==undefined) && displayComponent.componentName}</h6>
            {(displayComponent!==undefined) && 
                <DetailedComponentCard
                    singleSubContractor={singleSubContractor}
                    displayComponent={displayComponent} />   
            }
        </div>
    )
}

export default ComponentOverviewRightSide