import React from 'react'
import SearchSubcontractor from "../Subcontractor/SearchSubcontractors"

const ComponentOverviewRightSide = (props) => {

    return (
        <div className="large_Detail_Container">
            <h6>Details</h6>
            <div className="large_Component_List_Container">
                <SearchSubcontractor />
            </div>
        </div>
    )
}

export default ComponentOverviewRightSide