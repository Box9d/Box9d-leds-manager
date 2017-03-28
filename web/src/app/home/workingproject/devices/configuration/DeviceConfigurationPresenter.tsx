import * as React from "react";
import { Accordion, Button, Divider, Form, Header, Input, Label, Message, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import DeviceConfigurationModal from "./DeviceConfigurationModalContainer";
import { DeviceConfigurationValidator } from "./DeviceConfigurationValidator";

export class DeviceConfigurationsPresenter extends React.Component<IDeviceConfigurationProps, undefined> {

    public render(): JSX.Element {

        let validator: DeviceConfigurationValidator = new DeviceConfigurationValidator(this.props);

        return <div className="device-config-panel">
                <Form error={!validator.validateForm().isValid}>
                    <Divider horizontal>Pixels</Divider>
                    <Form.Group widths="equal">
                        <Form.Field error={!validator.validateHorizontalPixels().isValid}>
                            <Form.Input label="Horizontal pixels" placeholder="Width in pixels" type="number" value={this.props.deviceConfiguration.numberOfHorizontalPixels} onChange={(e) => { this.props.horizontalPixelsOnChange((e as any).target.value); } } />
                            {!validator.validateHorizontalPixels().isValid && <Label basic color="red" pointing>{validator.validateHorizontalPixels().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={!validator.validateVerticalPixels().isValid}>
                            <Form.Input label="Vertical pixels" placeholder="Height in pixels" type="number" value={this.props.deviceConfiguration.numberOfVerticalPixels} onChange={(e) => { this.props.verticalPixelsOnChange((e as any).target.value); } } />
                            {!validator.validateVerticalPixels().isValid && <Label basic color="red" pointing>{validator.validateVerticalPixels().errorMessage}</Label>}
                        </Form.Field>
                    </Form.Group>
                    <Divider horizontal>Mapping</Divider>
                    <Button color="blue" onClick={(e: any) => { e.preventDefault(); this.props.onModalOpened(); }}>Configure mapping</Button>
                    {this.props.isMappingConfigured && <Label color="green">OK</Label>}
                    {!this.props.isMappingConfigured && <Label color="yellow">Not mapped</Label>}
                    <DeviceConfigurationModal />
                    <Divider />
                    <Button disabled={!this.props.isMappingConfigured} color="green">Save</Button>
                </Form>
            </div>;
    }
}

export interface IDeviceConfigurationProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    isMappingConfigured?: boolean;
    onModalOpened?: () => void;
    horizontalPixelsOnChange?: (value: number) => void;
    verticalPixelsOnChange?: (value: number) => void;
};
