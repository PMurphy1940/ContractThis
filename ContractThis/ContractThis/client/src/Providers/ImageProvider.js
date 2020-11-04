import React, { useContext, createContext } from 'react';
import { ProfileContext } from "./ProfileProvider";

export const ImageContext = createContext();

export const ImageProvider = (props) => {

    const { getToken } = useContext(ProfileContext);


    const uploadImage = (info) =>
        getToken().then((token) =>
        fetch('/api/image', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: info
        }).then(resp => {
            if (resp.ok) {
                return;
            }
            window.alert("Image upload unsuccessful.")
        })); 

        return (
            <ImageContext.Provider value={{ uploadImage }}>
                {props.children}
            </ImageContext.Provider>
        );
};