import * as React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import * as ApiClient from "../../../../../api/build/ApiClient";
import OpenProjectModal from "./OpenProjectModalContainer";

export class OpenProjectPresenter extends React.Component<IOpenProjectProps, undefined> {

    public render() {
        return <div>
            <Header as="h4">Open an existing project</Header>
            <Button color="green" onClick={this.props.onModalOpened}>Choose project...</Button>
            <OpenProjectModal/>
        </div>;
    }
}

export interface IOpenProjectProps {
    onModalOpened?: () => void;
}
