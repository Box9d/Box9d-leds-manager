import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "semantic-ui-css/semantic.min.css";
import App from "./app/AppContainer";
import { appReducer } from "./app/AppReducer";

ReactDOM.render(
    <Provider store={createStore(appReducer)}>
        <App/>
    </Provider>,
    document.getElementById("root"),
);
