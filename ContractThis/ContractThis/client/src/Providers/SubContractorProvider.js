import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider"

export const SubContractorContext = createContext()

export function SubContractorProvider(props) {
    const apiUrl = "/api/subcontractor";

    const { getToken } = useContext(ProfileContext)
    const [subContractors, setSubContractors] = useState([])

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

    const GetSubContractorTypes = (typeId) => {
        getToken().then((token) => 
        fetch(`${apiUrl}/${typeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then(setSubContractors)
        )
    }
    return (
        <SubContractorContext.Provider
          value={{ subContractors, GetSubContractorTypes, RegisterSubcontractor }}>         
             {props.children}           
        </SubContractorContext.Provider>
      );
}



