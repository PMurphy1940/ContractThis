import React from 'react';


const SubContractorSearchResultCard = (props) => {

    return (
        <div className="project_Component_Detail_Card">
                <h4 className="detail_Banner">{props.sub.subcontractorBusinessName}</h4>
                <div className="detail_Text">
                    <p className="detail_Description" >{props.sub.subcontractorBusinessName} s;ldhg</p>
                </div>
                <button className="far fa-list-alt delete_Button" onClick={() => props.bigDetailPage(props.displayComponent.id) }/>
                <button className="far fa-edit delete_Button" onClick={() => props.editComponent(props.displayComponent.id) }/>
                <button className="far fa-trash-alt delete_Button" onClick={() => props.deleteThisComponent(props.displayComponent.id) }/>
        </div>
    )
}

export default SubContractorSearchResultCard