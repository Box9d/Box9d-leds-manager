import * as React from "react";
import { Accordion, Button, Divider, Form, Header, Input, Label, Message, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import DeviceConfigurationModal from "./DeviceConfigurationModalContainer";
import { DeviceConfigurationValidator } from "./DeviceConfigurationValidator";

export class DeviceConfigurationsPresenter extends React.Component<IDeviceConfigurationProps, undefined> {

    private validator: DeviceConfigurationValidator;

    constructor(props: IDeviceConfigurationProps) {
        super(props);

        this.validator = new DeviceConfigurationValidator(this.props);
    }

    public render(): JSX.Element {

        return <div className="device-config-panel">
                <Form error={!this.validator.validateForm().isValid}>
                    <Divider horizontal>Pixels</Divider>
                    <Form.Group widths="equal">
                        <Form.Field error={!this.validator.validateHorizontalPixels().isValid}>
                            <Form.Input label="Horizontal pixels" placeholder="Width in pixels" type="number" value={this.props.deviceConfiguration.numberOfHorizontalPixels} onChange={(e) => { this.props.horizontalPixelsOnChange((e as any).target.value); } } />
                            {!this.validator.validateHorizontalPixels().isValid && <Label basic color="red" pointing>{this.validator.validateHorizontalPixels().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={!this.validator.validateVerticalPixels().isValid}>
                            <Form.Input label="Vertical pixels" placeholder="Height in pixels" type="number" value={this.props.deviceConfiguration.numberOfVerticalPixels} onChange={(e) => { this.props.verticalPixelsOnChange((e as any).target.value); } } />
                            {!this.validator.validateVerticalPixels().isValid && <Label basic color="red" pointing>{this.validator.validateVerticalPixels().errorMessage}</Label>}
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

    public componentWillReceiveProps(nextProps: IDeviceConfigurationProps): void {
        this.validator = new DeviceConfigurationValidator(nextProps);
    }
}

export interface IDeviceConfigurationProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    isMappingConfigured?: boolean;
    onModalOpened?: () => void;
    horizontalPixelsOnChange?: (value: number) => void;
    verticalPixelsOnChange?: (value: number) => void;
};
