import * as React from "react";
import { Accordion, Button, Divider, Form, Header, Input, Label, Message, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { DeviceConfigurationValidator } from "./DeviceConfigurationValidator";
import DeviceConfigurationModal from "./DeviceConfigurationModalContainer";

export class DeviceConfigurationsPresenter extends React.Component<IDeviceConfigurationProps, IDeviceConfigurationLocalState> {

    constructor(props: IDeviceConfigurationProps) {
        super(props);
        this.state = {widthPixels: 0, heightPixels: 0};
    }

    public render(): JSX.Element {
        let validator = new DeviceConfigurationValidator(this.state);

        return <div className="device-config-panel">
                <Form error={!validator.validateState().isValid}>
                    <Divider horizontal>Pixels</Divider>
                    <Form.Group widths="equal">
                        <Form.Field error={!validator.validateWidthPixels().isValid}>
                            <Form.Input label="Width (px)" placeholder="Width in pixels" type="number" value={this.state.widthPixels} onChange={(e: any) => this.setState({ widthPixels: e.target.value })} />
                            {!validator.validateWidthPixels().isValid && <Label basic color="red" pointing>{validator.validateWidthPixels().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={!validator.validateHeightPixels().isValid}>
                            <Form.Input label="Height (px)" placeholder="Height in pixels" type="number" value={this.state.heightPixels} onChange={(e: any) => this.setState({ heightPixels: e.target.value })} />
                            {!validator.validateHeightPixels().isValid && <Label basic color="red" pointing>{validator.validateHeightPixels().errorMessage}</Label>}                        
                        </Form.Field>
                    </Form.Group>
                    <Divider horizontal>Mapping</Divider>
                    <Button disabled={!validator.validateWidthAndHeight().isValid} color="blue" onClick={(e: any) => { e.preventDefault(); this.props.onModalOpened(); }}>Configure mapping</Button>
                    {this.props.isMappingConfigured && <Label color="green">OK</Label>}
                    {!this.props.isMappingConfigured && <Label color="yellow">Not mapped</Label>}
                    <DeviceConfigurationModal />
                    <Divider />
                    <Button disabled={!validator.validateState().isValid || !this.props.isMappingConfigured} color="green">Save</Button>
                </Form>
            </div>;
    }
}

export interface IDeviceConfigurationProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    widthPixels?: number;
    heightPixels?: number;
    isMappingConfigured?: boolean;
    onModalOpened?: () => void;
};

export interface IDeviceConfigurationLocalState {
    widthPixels: number;
    heightPixels: number;
}