import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";  <-- 暫時屏蔽左佢，免得報錯

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
