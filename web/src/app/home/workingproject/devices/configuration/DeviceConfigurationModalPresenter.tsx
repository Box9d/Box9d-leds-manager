import * as React from "react";
import { Button, Header, Icon, Label, Modal, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import "./DeviceConfigurationModalStyles.scss";

export class DeviceConfigurationModalPresenter extends React.Component<IDeviceConfigurationModalProps, IDeviceConfigurationState> {

    constructor(props: IDeviceConfigurationModalProps) {
        super(props);

        this.state = {pixelMappings: [].concat(props.currentMapping)};
    }

    public render() {
        let data = [];
        for (let row = 0; row < this.props.deviceConfiguration.numberOfVerticalPixels; row++) {
            data[row] = [];
            for (let col = 0; col < this.props.deviceConfiguration.numberOfHorizontalPixels; col++) {
                data[row].push(col);
            }
        }

        let horizontalScrollStyling = {
            overflowX: "scroll",
        };

        return <div>
            <Modal defaultOpen onClose={this.props.onModalClose} closeIcon="close" dimmer="blurring" size={"fullscreen" as any}>
                <Modal.Content>
                    <div className="description" style={horizontalScrollStyling}>
                        <div className="mapping-table">
                            {
                                data.map((row, rowNum) => {
                                    return <div key={rowNum + 1} className="mapping-row">
                                        {
                                            row.map((col) =>
                                            <div key={col + 1} className="mapping-col">
                                                <Label as="a" size="tiny" circular color={this.getMapping(col + 1, rowNum + 1).mappingOrder !== 0 ? "blue" : "black"} onClick={(e: any) => this.setMapping(col + 1, rowNum + 1)}>
                                                        {
                                                            this.getMapping(col + 1, rowNum + 1).mappingOrder !== 0 &&
                                                            this.getMapping(col + 1, rowNum + 1).mappingOrder
                                                        }
                                                </Label>
                                            </div>,
                                        )}
                                    </div>;
                                },
                            )}
                        </div>
                    </div>
                    <div className="mapping-save-wrapper">
                        <Button icon="undo" content="Undo" labelPosition="right" onClick={this.undoLastMapping} />
                        <Button icon="erase" content="Clear" labelPosition="right" onClick={this.clearMappings} />
                        <Button color="green" onClick={this.saveMappings} className="mapping-save" floated="right">Save</Button>
                    </div>
                </Modal.Content>
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

        if (mappings.find((m) => m.horizontalPosition === mapping.horizontalPosition && m.verticalPosition === mapping.verticalPosition)) {
            return; // Do not overwrite existing mapping
        }

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

    private saveMappings = (): void => {
        this.props.saveMapping(this.state.pixelMappings);
    }

    private clearMappings = (): void => {
        this.setState({pixelMappings: new Array<ApiClient.ProjectDeviceVersionMapping>()});
    }
}

export interface IDeviceConfigurationModalProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    modalIsOpen?: boolean;
    onModalClose?: () => void;
    currentMapping?: ApiClient.ProjectDeviceVersionMapping[];
    saveMapping?: (pixelMappings: ApiClient.ProjectDeviceVersionMapping[]) => void;
}

export interface IDeviceConfigurationState {
    pixelMappings: ApiClient.ProjectDeviceVersionMapping[];
}
