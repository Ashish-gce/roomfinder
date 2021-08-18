import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { RoomProvider } from "./context";

ReactDOM.render(
  // here we wrapping everything inside <RoomProvider /> component that's why we can use data in any component.
  <RoomProvider>
    <Router>
      <App />
    </Router>
  </RoomProvider>,
  document.getElementById("root")
);
