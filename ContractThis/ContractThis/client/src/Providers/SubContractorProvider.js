import React, { createContext, useState, useContext } from 'react';
import { ProfileContext } from "./ProfileProvider"

export const SubContractorContext = createContext()

export function SubContractorProvider(props) {
    const apiUrl = "/api/subcontractor";

    const { getToken } = useContext(ProfileContext)
    const [subContractors, setSubContractors] = useState([])
    const [subContractorTypes, setSubContractorTypes] = useState([])

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
    // const GetSubContractorsByType = (typeId) => {
    //     getToken().then((token) => 
    //     fetch(`${apiUrl}/types/${typeId}`, {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //     .then((response) => response.json())
    //     .then(setSubContractors)
    //     )
    // }

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

    return (
        <SubContractorContext.Provider
          value={{ subContractors, subContractorTypes, GetSubContractorTypes, RegisterSubcontractor, GetSubContractorsByType }}>         
             {props.children}           
        </SubContractorContext.Provider>
      );
}



