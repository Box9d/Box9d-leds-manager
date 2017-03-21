import * as React from "react";
import { Button, Divider, Form, Header, Input, Label } from "semantic-ui-react";
import { ISettingsState } from "src/app/settings/SettingsState";
import { ValidationResult } from "src/validation/ValidationResult";
import { SettingsValidator } from "./SettingsValidator"

export class SettingsPresenter extends React.Component<ISettingsProps, ISettingsState> {

    constructor(props: ISettingsProps) {
        super(props);

        this.state = { editIpStart: this.props.ipAddressStart, editIpEnd: this.props.ipAddressEnd };
    }

    public render() {
        let validator = new SettingsValidator();
        return <div>
            <Header as="h1">Settings</Header>
            <Form>
                <fieldset>
                    <Divider horizontal>IP addresses</Divider>
                    <Form.Group widths="equal">        
                        <Form.Field error={!validator.validateIp(this.state.editIpStart).isValid}>
                            <Form.Input label="IP start" placeholder="IP start" value={this.state.editIpStart} onChange={(e: any) => this.setState({ editIpStart: e.target.value })}/>
                            {!validator.validateIp(this.state.editIpStart).isValid && <Label basic color="red" pointing>{validator.validateIp(this.state.editIpStart).errorMessage}</Label>}     
                        </Form.Field>
                        <Form.Field error={!validator.validateIp(this.state.editIpEnd).isValid}>
                            <Form.Input label="IP end" placeholder="IP end" value={this.state.editIpEnd} onChange={(e: any) => this.setState({ editIpEnd: e.target.value })} />   
                            {!validator.validateIp(this.state.editIpEnd).isValid && <Label basic color="red" pointing>{validator.validateIp(this.state.editIpEnd).errorMessage}</Label>}               
                        </Form.Field>
                    </Form.Group>
                    <Divider horizontal>Other stuff</Divider>
                    <Form.Input label="More stuff" placeholder="More stuff" />
                    <Button color="green" onClick={(e: any) => { e.preventDefault(); this.props.saveSettings(this.state.editIpStart, this.state.editIpEnd); }}>Save</Button>
                </fieldset>    
            </Form>
        </div>;
    }

    public componentDidMount() {
        this.props.fetchSettings();
    }

    public componentWillReceiveProps(nextProps: ISettingsProps) {
        this.setState({editIpStart: nextProps.ipAddressStart, editIpEnd: nextProps.ipAddressEnd });
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
    fetchSettings?: () => void;
    saveSettings?: (ipStart: string, ipFinish: string) => void;
    ipAddressStart?: string;
    ipAddressEnd?: string;
}