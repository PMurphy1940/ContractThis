import React, { useContext } from 'react';
import { BidContext } from "../../Providers/BidProvider"
const SubContractorSearchResultCard = (props) => {
    const { setSelectedContractor } = useContext(BidContext);

    const contactThisContractor = () => {
        setSelectedContractor(props.sub)
        props.firstConversation(props.sub.id)
    }

    return (
        <div className="searchSubs_Detail_Card">
                <h7 className="search_Result_Card_Banner">{props.sub.subcontractorBusinessName}</h7>
                <div className="detail_Text">
                    <p className="detail_Description" >{props.sub.businessStatement}</p>
                </div>
                <div className="search_Subs">
                    <button id="contact_Sub"className="far fa-comments " onClick={() => contactThisContractor() }/>
                </div>
        </div>
    )
}

export default SubContractorSearchResultCard
