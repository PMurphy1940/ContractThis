import React, { createContext } from "react";

export const LocalUserContext = createContext();

export function LocalUserProvider (props) {
    const userId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const userFirstName = JSON.parse(sessionStorage.getItem("userProfile")).firstName;
    const userLastName = JSON.parse(sessionStorage.getItem("userProfile")).lastName
    const userImageLoc = JSON.parse(sessionStorage.getItem("userProfile")).imageLocation;
    const userDisplayName = JSON.parse(sessionStorage.getItem("userProfile")).screenName;
    const isSubcontractor = JSON.parse(sessionStorage.getItem("userProfile")).isSubcontractor;

    return (
        <LocalUserContext.Provider 
          value={{ userId, userFirstName, userLastName,  userImageLoc, userDisplayName, isSubcontractor }}>
              {props.children}
        </LocalUserContext.Provider>
      );
}