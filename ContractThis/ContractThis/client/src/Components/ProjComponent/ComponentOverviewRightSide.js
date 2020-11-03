import React, { useContext } from 'react';
import { ComponentContext } from "../../Providers/ComponentProvider"
import { SubContractorContext } from "../../Providers/SubContractorProvider";
import DetailedComponentCard from "./DetailedComponentCard"


const ComponentOverviewRightSide = (props) => {

    const { singleSubContractor } = useContext(SubContractorContext);      
    const { displayComponent } = useContext(ComponentContext);


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