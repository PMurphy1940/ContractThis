import React, { useState, useEffect, useContext } from 'react'
import { SubContractorContext } from "../../Providers/SubContractorProvider"
import SubContractorSearchResultCard from "./SubContractorSearchResultCard"

const SearchSubcontractor = () => {

    const {
        subContractors, 
        subContractorTypes, 
        GetSubContractorTypes,
        GetSubContractorsByType
    } = useContext(SubContractorContext)

    const TypeOption = (props) => {
        return (
        <option value={props.type.id}>{props.type.specialty}</option>
        )
    } 
console.log("Sub types", subContractorTypes)
    useEffect(() => {
        GetSubContractorTypes()
    }, [])
    return (
        <>
        <p>SearchSubcontractor</p>
        <select name="SubTypes" id="SubTypes" onChange={(e) => GetSubContractorsByType(e.target.value) }>
        <option>Select a trade</option>
            {subContractorTypes.map((type) => 
            <TypeOption
                key={type.id}
                type={type} 
                />
            )}
        </select>

        {subContractors.map((sub) => 
        <SubContractorSearchResultCard 
            key={sub.Id}
            sub={sub}
            />
        )}
        </>
    )
}

export default SearchSubcontractor