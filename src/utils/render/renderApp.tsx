import React, { FC } from "react";
import ReactDOM from "react-dom";

import "../../styles/index.scss";

export default function renderApp(Component: FC) {
    ReactDOM.render(
        <React.StrictMode>
            <Component />
        </React.StrictMode>,
        document.getElementById("root")
    );
}
