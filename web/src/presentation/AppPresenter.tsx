import * as React from "react";
import { Menu } from "semantic-ui-react";
import Nav from "../containers/NavContainer";

export class AppPresenter extends React.Component<IAppProps, undefined> {
    public render() {
        return <div>
            <Nav/>
         </div>;
    }
}

export interface IAppProps {
}
