import * as React from "react";
import { Button, Header, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../api/build/ApiClient";

export class OpenProjectModalPresenter extends React.Component<IOpenProjectModalProps, undefined> {
    public render() {

        if (!this.props.modalIsOpen) {
            return <div></div>;
        }

        return <div>
            <Modal defaultOpen onClose={this.props.onModalClose}>
                <Modal.Header>Open project</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Project name</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.projects.map((proj: ApiClient.Project) => {
                                return <Table.Row key={proj.id}>
                                    <Table.Cell selectable>
                                        <a href="#" onClick={(e: any) => this.props.selectProjectOnClick(proj.id)}>{proj.name}</a>
                                    </Table.Cell>
                                </Table.Row>;
                            })}        
                        </Table.Body>
                        </Table>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div>;
    }
}

export interface IOpenProjectModalProps {
    modalIsOpen?: boolean;
    projects?: ApiClient.Project[];
    selectProjectOnClick?: (projectId: number) => void;
    onModalClose?: () => void;
}
