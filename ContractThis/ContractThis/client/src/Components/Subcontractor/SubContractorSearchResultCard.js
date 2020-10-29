import React from 'react';


const SubContractorSearchResultCard = (props) => {

    return (
        <div className="project_Component_Detail_Card">
                <h4 className="detail_Banner">{props.sub.subcontractorBusinessName}</h4>
                <div className="detail_Text">
                    <p className="detail_Description" >{props.sub.subcontractorBusinessName} s;ldhg</p>
                </div>
                <div className="search_Subs">
                    <button id="contact_Sub"className="far fa-comments " onClick={() => props.openConversation(props.sub.id) }/>
                </div>
        </div>
    )
}

export default SubContractorSearchResultCard
