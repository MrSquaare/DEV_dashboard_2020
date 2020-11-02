import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
    <App backendHost={`http://localhost:8081`} />,
    document.getElementById("root")
);
