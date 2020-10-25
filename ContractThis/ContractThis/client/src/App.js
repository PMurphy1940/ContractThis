import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileProvider } from "./Providers/ProfileProvider";
import ApplicationViews from "./Components/ApplicationViews";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <ProfileProvider>
        <NavBar />
        <ApplicationViews />
      </ProfileProvider>
    </Router>
  );
}

export default App;
