import * as React from "react";
import { Button, Header, Icon, Label, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import "./DeviceConfigurationModalStyles.scss";

export class DeviceConfigurationModalPresenter extends React.Component<IDeviceConfigurationModalProps, IDeviceConfigurationState> {

    constructor(props: IDeviceConfigurationModalProps) {
        super(props);

        this.state = {pixelMappings: new Array<ApiClient.ProjectDeviceVersionMapping>()};
    }

    public render() {
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
                                    <div key={col} className="mapping-col">
                                        <Label as="a" circular color={this.getMapping(rowNum, col).mappingOrder !== 0 ? "blue" : "black"} onClick={(e: any) => this.setMapping(rowNum, col)}>
                                                {
                                                    this.getMapping(rowNum, col).mappingOrder !== 0 &&
                                                    this.getMapping(rowNum, col).mappingOrder
                                                }
                                        </Label>
                                    </div>,
                                )}
                            </div>;
                        },
                    )}
                </div>
                <div className="mapping-save-wrapper">
                    <Button icon="undo" content="Undo" labelPosition="right" onClick={this.undoLastMapping} />
                    <Button icon="erase" content="Clear" labelPosition="right" onClick={this.clearMappings} />
                    <Button color="green" onClick={this.props.saveMapping} className="mapping-save" floated="right">Save</Button>
                </div>
            </Modal>
        </div>;
    }

    private setMapping = (horizontal: number, vertical: number): void => {
        let existingOrders = this.state.pixelMappings.map((m) => m.mappingOrder);
        let order = (existingOrders.length > 0 ? Math.max.apply(null, existingOrders) : 0) + 1;

        let mapping: ApiClient.ProjectDeviceVersionMapping = new ApiClient.ProjectDeviceVersionMapping();
        mapping.horizontalPosition = horizontal;
        mapping.verticalPosition = vertical;
        mapping.mappingOrder = order;

        let mappings = this.state.pixelMappings;
        mappings.push(mapping);

        this.setState({pixelMappings: mappings});
    }

    private getMapping = (horizontal: number, vertical: number): ApiClient.ProjectDeviceVersionMapping => {
        for (let mapping of this.state.pixelMappings) {
            if (mapping.horizontalPosition === horizontal && mapping.verticalPosition === vertical) {
                return mapping;
            }
        }

        let mapping = new ApiClient.ProjectDeviceVersionMapping();
        mapping.horizontalPosition = 0;
        mapping.verticalPosition = 0;
        mapping.mappingOrder = 0;

        return mapping;
    }

    private undoLastMapping = (): void => {
        if (this.state.pixelMappings.length > 0) {
            let mappings = this.state.pixelMappings;
            mappings.sort((a, b) => { return a.mappingOrder - b.mappingOrder; }).pop();

            this.setState({pixelMappings: mappings});
        }
    }

    private clearMappings = (): void => {
        this.setState({pixelMappings: new Array<ApiClient.ProjectDeviceVersionMapping>()});
    }
}

export interface IDeviceConfigurationModalProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    modalIsOpen?: boolean;
    onModalClose?: () => void;
    saveMapping?: () => void;
}

export interface IDeviceConfigurationState {
    pixelMappings: ApiClient.ProjectDeviceVersionMapping[];
}
