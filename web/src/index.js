import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./style.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stateManager/Store";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { ConfigProvider } from "antd";
import RootContextProvider from "./RootComponent/RootContextProvider";
import fa_IR from "antd/es/locale/fa_IR";

ReactDOM.render(
  <ConfigProvider direction={"rtl"} locale={fa_IR}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <RootContextProvider>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </RootContextProvider>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
