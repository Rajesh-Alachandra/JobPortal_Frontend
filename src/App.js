// App.js
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import AppRoutes from "./Routes/index";

//import Custom Style scss
import "./assets/scss/themes.scss";

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;