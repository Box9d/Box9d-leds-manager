import * as React from "react";
import { Button, Header, Modal, Divider, Container } from "semantic-ui-react";
import * as ApiClient from "../../../../../api/build/ApiClient";
import OpenProjectModal from "./OpenProjectModalContainer";

export class OpenProjectPresenter extends React.Component<IOpenProjectProps, undefined> {

    public render() {
        return <Container fluid>
            <Header as="h3" textAlign="center">Open an existing project</Header>
            <Divider />
            <Button fluid color="green" onClick={this.props.onModalOpened}>Choose project...</Button>
            <OpenProjectModal />
        </Container>;
    }
}

export interface IOpenProjectProps {
    onModalOpened?: () => void;
}
