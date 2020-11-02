import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider";
import { WindowStateContext } from "./WindowStateProvider"



export const SubContractorContext = createContext()

export function SubContractorProvider(props) {
    const apiUrl = "/api/subcontractor";

    const { getToken } = useContext(ProfileContext)
    const [subContractors, setSubContractors] = useState([])
    const [subContractorTypes, setSubContractorTypes] = useState([])
    const [singleSubContractor, setSingleSubContractor] = useState([])
    const [subContractorJobs, setSubContractorJobs] = useState([])

    const { setShowSearchSubs, showSearchSubs, initialBidFormActive, setInitialBidFormActive } = useContext(WindowStateContext)



    const RegisterSubcontractor = (subObject) => {
      debugger
      getToken().then((token) => 
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subObject)
      }))
      .then((response) => response.json())
    }
//GET just a single type
    const GetSubContractorsById = (Id) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${Id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then(setSingleSubContractor)
        )
    }

    //GET search of multuple selected types
    const GetSubContractorsByType = (searchString) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/find?q=${searchString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then(setSubContractors)
      )
  }

    const GetSubContractorTypes = () => {
      getToken().then((token) => 
      fetch(`${apiUrl}/types/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then(setSubContractorTypes)
      )
    }

    const GetSubContractorJobs = (id) => {
      getToken().then((token) => 
      fetch(`${apiUrl}/jobs/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then((response) => response.json()
      .then(setSubContractorJobs))
    }

    return (
        <SubContractorContext.Provider
          value={{ subContractors, subContractorTypes, singleSubContractor, subContractorJobs, 
                  GetSubContractorTypes, RegisterSubcontractor, GetSubContractorJobs,
                  GetSubContractorsByType, GetSubContractorsById }}>         
             {props.children}           
        </SubContractorContext.Provider>
      );
}



