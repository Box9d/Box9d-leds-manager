import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./containers/AppContainer";
import { appReducer } from "./reducers/AppReducer";
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
    <Provider store={createStore(appReducer)}>
        <App/>
    </Provider>,
    document.getElementById("root"),
);
