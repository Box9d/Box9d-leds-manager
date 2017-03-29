import * as React from "react";
import { Accordion, Button, Divider, Form, Header, Input, Label, Message, Segment, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";
import DeviceConfigurationModal from "./DeviceConfigurationModalContainer";
import { DeviceConfigurationValidator } from "./DeviceConfigurationValidator";

export class DeviceConfigurationsPresenter extends React.Component<IDeviceConfigurationProps, IDeviceConfigurationState> {

    constructor(props: IDeviceConfigurationProps) {
        super(props);

        this.state = {shouldValidate: false};
    }

    public render(): JSX.Element {

        let validator: DeviceConfigurationValidator = new DeviceConfigurationValidator(this.props);

        return <div className="device-config-panel">
                <Form error={this.state.shouldValidate && !validator.validateForm().isValid}>
                    <Divider horizontal>Pixels</Divider>
                    <Form.Group widths="equal">
                        <Form.Field error={this.state.shouldValidate && !validator.validateHorizontalPixels().isValid}>
                            <Form.Input label="Horizontal pixels" placeholder="Width in pixels" type="number" value={this.props.deviceConfiguration.numberOfHorizontalPixels} onChange={(e) => { this.props.horizontalPixelsOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateHorizontalPixels().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateHorizontalPixels().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={this.state.shouldValidate && !validator.validateVerticalPixels().isValid}>
                            <Form.Input label="Vertical pixels" placeholder="Height in pixels" type="number" value={this.props.deviceConfiguration.numberOfVerticalPixels} onChange={(e) => { this.props.verticalPixelsOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateVerticalPixels().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateVerticalPixels().errorMessage}</Label>}
                        </Form.Field>
                    </Form.Group>
                    <Divider horizontal>Mapping</Divider>
                    <Button color="blue" onClick={this.configureMappingOnClick}>Configure mapping</Button>
                    {this.props.isMappingConfigured && <Label color="green">OK</Label>}
                    {!this.props.isMappingConfigured && <Label color="yellow">Not mapped</Label>}
                    { this.props.modalIsOpen && <DeviceConfigurationModal /> }
                    <Divider />
                    <Button disabled={!this.props.isMappingConfigured} color="green">Save</Button>
                </Form>
            </div>;
    }

    private configureMappingOnClick = (e: any): void => {
        e.preventDefault();

        let validator: DeviceConfigurationValidator = new DeviceConfigurationValidator(this.props);
        if (!validator.validateForm().isValid) {
            this.setState({shouldValidate: true});
        } else {
            this.props.onModalOpened();
        }
    }
}

export interface IDeviceConfigurationProps {
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    isMappingConfigured?: boolean;
    onModalOpened?: () => void;
    modalIsOpen?: boolean;
    horizontalPixelsOnChange?: (value: number) => void;
    verticalPixelsOnChange?: (value: number) => void;
};

export interface IDeviceConfigurationState {
    shouldValidate: boolean;
}
