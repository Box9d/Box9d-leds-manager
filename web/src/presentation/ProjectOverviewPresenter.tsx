import * as React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import * as ApiClient from "../../../api/build/ApiClient";

export class ProjectOverviewPresenter extends React.Component<IProjectOverviewProps, undefined> {

    public render() {
        return <div>
            <Header as="h3" dividing textAlign="center">
                Project overview - {this.props.project.name}
            </Header>
        </div>;
    }
}

export interface IProjectOverviewProps {
    project?: ApiClient.Project;
}
