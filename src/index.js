import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalCSS from "./globalStyles";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
  <>
    <GlobalCSS />
    <App />
  </>,
  document.querySelector(".root")
);
