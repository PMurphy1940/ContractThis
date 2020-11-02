import React, { useContext } from 'react';
import { BidContext } from "../../Providers/BidProvider"

const SubContractorRequest = (props) => {
    const { AcceptBid } = useContext(BidContext)

    const dateConverter = (suppliedDate) =>{
        let date = suppliedDate.toString()
        date = date.slice(0,10)
        date = date.split("-")
        return date = `${date[1]}-${date[2]}-${date[0]}`
    }

console.log(props)

    return (
        <div className="project_Component_Detail_Card">
        <h4 className="detail_Banner_With_Button">Bid Request
        {(props.bid.subAccepted === null) &&
            <button className="fas fa-flag-checkered complete_Button" onClick={() => AcceptBid(props.bid)} >
            <div>
                Accept
            </div>
            </button>}
        </h4>
        <div className="detail_Text">
            <p className="detail_Description" >{props.bid.ownerComment}</p>
            {(props.bid.subAccepted !== null) && <p>Bid accepted on {dateConverter(props.bid.subAccepted)}</p>}
            <p className="detail_Budget">${props.bid.fee}</p>
        </div>
    </div>
    )
}

export default SubContractorRequest