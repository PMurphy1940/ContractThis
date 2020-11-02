import React, { useContext } from 'react';
import { BidContext } from "../../Providers/BidProvider"
const SubContractorSearchResultCard = (props) => {
    const { setSelectedContractor } = useContext(BidContext);

    const contactThisContractor = () => {
        setSelectedContractor(props.sub)
        props.firstConversation(props.sub.id)
    }

    return (
        <div className="project_Component_Detail_Card">
                <h4 className="detail_Banner">{props.sub.subcontractorBusinessName}</h4>
                <div className="detail_Text">
                    <p className="detail_Description" >{props.sub.subcontractorBusinessName}</p>
                </div>
                <div className="search_Subs">
                    <button id="contact_Sub"className="far fa-comments " onClick={() => contactThisContractor() }/>
                </div>
        </div>
    )
}

export default SubContractorSearchResultCard
