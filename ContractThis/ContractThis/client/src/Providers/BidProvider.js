import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider";
import { WindowStateContext } from "./WindowStateProvider";


export const BidContext = createContext();

export function BidProvider(props) {
    const [bid, setBid] = useState();
    const [bidRequests, setBidRequests] = useState();
    const [selectedContractor, setSelectedContractor] = useState();
    const { setBidWindow, setShowSearchSubs } = useContext(WindowStateContext);

    const apiUrl = "api/bid";
    const { getToken } = useContext(ProfileContext);

    const GetBidByComponentId = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/component/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then((response) => response.json()
        .then(setBid))
    }

    const OpenBid = (bidObject) => {
        getToken().then((token) => 
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(bidObject)
        }))
        .then((response) => response.json())
        .then(() => {
            setShowSearchSubs(false);
            setBidWindow(false);
            GetBidByComponentId(bidObject.ProjectComponentId)
        })
    }

    const GetBidsBySubContractorId = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/subcontractor/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then((response) => response.json()
        .then(setBidRequests))
    }

    const AcceptBid = (bid) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/accept/${bid.id}`, {
            method: "PUT", 
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bid)
        }))
        .then((response) => response.json()
        .then(GetBidsBySubContractorId(bid.subContractorId)))
    }


    return (
        <BidContext.Provider
            value={{ bid, setBid, GetBidByComponentId, OpenBid, selectedContractor, setSelectedContractor,
                bidRequests, GetBidsBySubContractorId, AcceptBid
            }}>
            {props.children}
        </BidContext.Provider>
    )
}