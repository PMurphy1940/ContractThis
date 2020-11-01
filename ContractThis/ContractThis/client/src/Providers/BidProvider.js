import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider";
import { WindowStateContext } from "./WindowStateProvider";


export const BidContext = createContext();

export function BidProvider(props) {
    const [bid, setBid] = useState()
    const [selectedContractor, setSelectedContractor] = useState()
    const { setBidWindow, setShowSearchSubs } = useContext(WindowStateContext)

    const apiUrl = "api/bid";
    const { getToken } = useContext(ProfileContext);

    const GetBidByComponentId = (id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${id}`
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
        })
    }


    return (
        <BidContext.Provider
            value={{ bid, setBid, GetBidByComponentId, OpenBid, selectedContractor, setSelectedContractor
            }}>
            {props.children}
        </BidContext.Provider>
    )
}