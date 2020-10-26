import React, { createContext, useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import { Spinner } from "reactstrap";
import "firebase/auth";
import {useHistory} from 'react-router-dom';

export const ProfileContext = createContext();

export function ProfileProvider(props) {
    const apiUrl = "/api/userprofile";
    const userProfile = sessionStorage.getItem("userProfile");

    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [currentUser, setCurrentUser] = useState([]);
    const [aUser, setAUser] = useState()
    const history = useHistory();

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
        history.push("/projects")
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getCurrentUser = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json().then(setCurrentUser)));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const getUserById = (id) => {
    return getToken().then((token) =>
       fetch(`${apiUrl}/details/${id}`
      , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      ).then((resp) => resp.json())
        .then(setAUser)
    )
  };

  const updateUser = (user) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }));

  return (
    <ProfileContext.Provider
      value={{ isLoggedIn, currentUser, aUser, login, logout, register, getToken, getUserById, updateUser, getUserProfile, getCurrentUser }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </ProfileContext.Provider>
  );

}