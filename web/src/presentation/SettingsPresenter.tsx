import * as React from "react";
import { Header } from "semantic-ui-react";
import '../styles/SettingsPresenter.scss';

export class SettingsPresenter extends React.Component<ISettingsProps, undefined> {
    public render() {
        if (this.props.selectedNavItem !== "settings") {
            return <div></div>;
        }

        return <div>
            <Header as="h1">Settings</Header>
            <div className="test">
                Test
            </div>    
        </div>;
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
}