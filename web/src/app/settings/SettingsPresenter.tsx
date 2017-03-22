import * as ApiClient from "../../../../api/build/ApiClient";
import * as React from "react";
import { Button, Divider, Form, Header, Input, Label, Message } from "semantic-ui-react";
import { ISettingsState } from "src/app/settings/SettingsState";
import { ValidationResult } from "src/validation/ValidationResult";
import { SettingsValidator } from "./SettingsValidator"
import "./SettingsStyles.scss";

export class SettingsPresenter extends React.Component<ISettingsProps, ISettingsLocalState> {

    constructor(props: ISettingsProps) {
        super(props);

        this.state = {
            editIpStart: this.props.appPreferences.deviceSearchStartIp,
            editIpEnd: this.props.appPreferences.deviceSearchEndIp,
        };
    }

    public render() {
        let validator = new SettingsValidator(this.state);
        return <div className="page-content">
            <Header as="h1">Settings</Header>
            <Form error={!validator.validateState().isValid}>
                <Divider horizontal>IP addresses</Divider>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Form.Input label="IP start" placeholder="IP start" value={this.state.editIpStart} onChange={(e: any) => this.setState({ editIpStart: e.target.value })} />
                        {!validator.validateStartIp().isValid && <Label basic color="red" pointing>{validator.validateStartIp().errorMessage}</Label>}
                    </Form.Field>
                    <Form.Field error={!validator.validateEndIp().isValid}>
                        <Form.Input label="IP end" placeholder="IP end" value={this.state.editIpEnd} onChange={(e: any) => this.setState({ editIpEnd: e.target.value })} />
                        {!validator.validateEndIp().isValid && <Label basic color="red" pointing>{validator.validateEndIp().errorMessage}</Label>}
                    </Form.Field>
                </Form.Group>
                <Divider horizontal>Other stuff</Divider>
                <Form.Input label="More stuff" placeholder="More stuff" />
                <Button disabled={!validator.validateStartIp().isValid} color="green" onClick={(e: any) => { e.preventDefault(); this.props.saveSettings(this.state.editIpStart, this.state.editIpEnd); }}>Save</Button>
                <Message error >Can't save until the form is fixed!</Message>
            </Form>
        </div>;
    }

    public componentDidMount() {
        this.props.fetchSettings();
    }

    public componentWillReceiveProps(nextProps: ISettingsProps) {
        this.setState({ editIpStart: nextProps.appPreferences.deviceSearchStartIp, editIpEnd: nextProps.appPreferences.deviceSearchEndIp });
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
    fetchSettings?: () => void;
    saveSettings?: (ipStart: string, ipFinish: string) => void;
    appPreferences?: ApiClient.AppPreferences;
}

export interface ISettingsLocalState {
    editIpStart?: string;
    editIpEnd?: string;
}