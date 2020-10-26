import React, { createContext, useState, useEffect } from 'react';

export const SubContractorContext = createContext()

export function SubContractorProvider(props) {
    const apiUrl = "/api/subcontractor";

    const [subContractors, setSubContractors] = useState([])

    const GetSubContractorTypes = (typeId) => {
        return fetch(`${apiUrl}/${typeId}`)
        .then((response) => response.json())
        .then(setSubContractors)
    }

    


    return (
        <SubContractorContext.Provider
          value={{ subContractors, GetSubContractorTypes }}>         
             {props.children}           
        </SubContractorContext.Provider>
      );
}



