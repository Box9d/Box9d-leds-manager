import * as React from "react";
import { Button, Header, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";

export class DeviceConfigurationModalPresenter extends React.Component<IDeviceConfigurationModalProps, undefined> {
    public render() {

        if (!this.props.modalIsOpen) {
            return <div></div>;
        }

        return <div>
            <Modal defaultOpen onClose={this.props.onModalClose} closeIcon="close" dimmer="blurring">
                <div>Grid stuff here</div>
                <Button color="green" onClick={this.props.saveMapping}>Save</Button>
            </Modal>
        </div>;
    }
}

export interface IDeviceConfigurationModalProps {
    modalIsOpen?: boolean;
    onModalClose?: () => void;
    saveMapping?: () => void;
}
