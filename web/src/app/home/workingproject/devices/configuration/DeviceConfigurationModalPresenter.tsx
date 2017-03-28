import * as React from "react";
import { Button, Header, Icon, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import "./DeviceConfigurationModalStyles.scss";

export class DeviceConfigurationModalPresenter extends React.Component<IDeviceConfigurationModalProps, undefined> {
    public render() {

        if (!this.props.modalIsOpen) {
            return <div></div>;
        }

        let data = [];
        for (let row = 0; row < this.props.deviceConfiguration.numberOfVerticalPixels; row++) {
            data[row] = [];
            for (let col = 0; col < this.props.deviceConfiguration.numberOfHorizontalPixels; col++) {
                data[row].push(col);
            }
        }

        return <div>
            <Modal defaultOpen onClose={this.props.onModalClose} closeIcon="close" dimmer="blurring">
                <div className="mapping-table">
                    {
                        data.map((row, rowNum) => {
                            return <div key={rowNum} className="mapping-row">
                                {
                                    row.map((col) =>
                                    <div key={col} className="mapping-col"><Icon name="circle" /></div>,
                                )}
                            </div>;
                        },
                    )}
                </div>
                <div className="mapping-save-wrapper">
                    <Button color="green" onClick={this.props.saveMapping} fluid className="mapping-save">Save</Button>
                </div>    
            </Modal>
        </div>;
    }
}

export interface IDeviceConfigurationModalProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    modalIsOpen?: boolean;
    onModalClose?: () => void;
    saveMapping?: () => void;
}
