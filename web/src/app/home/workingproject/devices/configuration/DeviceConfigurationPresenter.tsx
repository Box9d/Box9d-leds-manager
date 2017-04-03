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
                    <Divider horizontal>Dimensions</Divider>
                    <Form.Group widths="equal">
                        <Form.Field error={this.state.shouldValidate && !validator.validateStartAtHorizontalPercentage().isValid}>
                            <Form.Input label="Start at width (in %)" placeholder="Start at width (in %)" type="number" value={this.props.deviceConfiguration.startAtHorizontalPercentage} onChange={(e) => { this.props.startAtHorizontalPercentageOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateStartAtHorizontalPercentage().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateStartAtHorizontalPercentage().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={this.state.shouldValidate && !validator.validateStartAtVerticalPercentage().isValid}>
                            <Form.Input label="Start at height (in %)" placeholder="Start at height (in %)" type="number" value={this.props.deviceConfiguration.startAtVerticalPercentage} onChange={(e) => { this.props.startAtVerticalPercentageOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateStartAtVerticalPercentage().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateStartAtVerticalPercentage().errorMessage}</Label>}                        
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field error={this.state.shouldValidate && !validator.validateHorizontalPercentage().isValid}>
                            <Form.Input label="Width (in %)" placeholder="Width (in %)" type="number" value={this.props.deviceConfiguration.horizontalPercentage} onChange={(e) => { this.props.horizontalPercentageOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateHorizontalPercentage().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateHorizontalPercentage().errorMessage}</Label>}                        
                        </Form.Field>
                        <Form.Field error={this.state.shouldValidate && !validator.validateVerticalPercentage().isValid}>
                            <Form.Input label="Height (in %)" placeholder="Height (in %)" type="number" value={this.props.deviceConfiguration.verticalPercentage} onChange={(e) => { this.props.verticalPercentageOnChange((e as any).target.value); } } />
                            {this.state.shouldValidate && !validator.validateVerticalPercentage().isValid && <Label basic color="red" pointing>{this.state.shouldValidate && validator.validateVerticalPercentage().errorMessage}</Label>}                        
                        </Form.Field>
                    </Form.Group>
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
                    {this.props.mappings.length > 0 && <Label color="green">OK</Label>}
                    {this.props.mappings.length === 0 && <Label color="yellow">Not mapped</Label>}
                    { this.props.modalIsOpen && <DeviceConfigurationModal /> }
                    <Divider />
                    <Button disabled={this.props.mappings.length === 0} color="green" onClick={this.saveConfiguration}>Save</Button>
                </Form>
            </div>;
    }

    private configureMappingOnClick = (e: any): void => {
        e.preventDefault();

        let validator: DeviceConfigurationValidator = new DeviceConfigurationValidator(this.props);
        if (!validator.validateHorizontalPixels().isValid || !validator.validateVerticalPixels().isValid) {
            this.setState({shouldValidate: true});
        } else {
            this.props.onModalOpened();
        }
    }

    private saveConfiguration = (e: any): void => {
        e.preventDefault();

        let validator: DeviceConfigurationValidator = new DeviceConfigurationValidator(this.props);
        if (!validator.validateForm().isValid) {
            this.setState({shouldValidate: true});
        } else {
            this.props.saveConfiguration(this.props.projectDeviceId, this.props.deviceConfiguration, this.props.mappings);
        }
    }
}

export interface IDeviceConfigurationProps {
    projectDeviceId?: number;
    deviceConfiguration?: ApiClient.ProjectDeviceVersion;
    mappings?: ApiClient.ProjectDeviceVersionMapping[];
    onModalOpened?: () => void;
    modalIsOpen?: boolean;
    horizontalPixelsOnChange?: (value: number) => void;
    verticalPixelsOnChange?: (value: number) => void;
    startAtHorizontalPercentageOnChange?: (value: number) => void;
    startAtVerticalPercentageOnChange?: (value: number) => void;
    horizontalPercentageOnChange?: (value: number) => void;
    verticalPercentageOnChange?: (value: number) => void;
    saveConfiguration?: (projectDeviceId: number, configuration: ApiClient.ProjectDeviceVersion, mappings: ApiClient.ProjectDeviceVersionMapping[]) => void;
};

export interface IDeviceConfigurationState {
    shouldValidate: boolean;
}
