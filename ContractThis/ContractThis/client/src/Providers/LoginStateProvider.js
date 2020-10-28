import React, { useState, createContext } from 'react'


export const LoginContext = createContext();

export function LoginProvider(props) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [screenName, setScreenName] = useState();
    const [email, setEmail] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [isSubcontractor, setIsSubcontractor] = useState(false);
    const [subcontractorBusinessName, setSubcontractorBusinessName] = useState()
    const [subcontractorImageUrl, setSubcontractorImageUrl] = useState()


    return (
        <LoginContext.Provider
          value={{ firstName, setFirstName, lastName, setLastName, screenName, setScreenName, email, setEmail, imageLocation, setImageLocation,
            password, setPassword, confirmPassword, setConfirmPassword, isSubcontractor, setIsSubcontractor,
            subcontractorBusinessName, setSubcontractorBusinessName, subcontractorImageUrl, setSubcontractorImageUrl}}>
             {props.children}
        </LoginContext.Provider>
      );
    
    }