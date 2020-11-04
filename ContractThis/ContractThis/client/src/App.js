import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileProvider } from "./Providers/ProfileProvider";
import { WindowStateProvider } from "./Providers/WindowStateProvider"
import ApplicationViews from "./Components/ApplicationViews";

function App() {
  return (
    <Router>
      <ProfileProvider>
        <WindowStateProvider>
          <ApplicationViews />
        </WindowStateProvider>
      </ProfileProvider>
    </Router>
  );
}

export default App;
