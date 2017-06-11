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

        if (!this.props.appPreferences.id) {
            return <div></div>;
        }

        return <div className="page-content">
            <Header as="h1">Settings</Header>
            <Form error={!validator.validateState().isValid}>
                <Divider horizontal>IP addresses</Divider>
                <Form.Group widths="equal">
                    <Form.Field error={!validator.validateStartIp().isValid}>
                        <Form.Input label="IP start" placeholder="IP start" value={this.state.editIpStart} onChange={(e: any) => this.setState({ editIpStart: e.target.value })} />
                        {!validator.validateStartIp().isValid && <Label basic color="red" pointing>{validator.validateStartIp().errorMessage}</Label>}
                    </Form.Field>
                    <Form.Field error={!validator.validateEndIp().isValid}>
                        <Form.Input label="IP end" placeholder="IP end" value={this.state.editIpEnd} onChange={(e: any) => this.setState({ editIpEnd: e.target.value })} />
                        {!validator.validateEndIp().isValid && <Label basic color="red" pointing>{validator.validateEndIp().errorMessage}</Label>}
                    </Form.Field>
                </Form.Group>
                <Divider horizontal>Ping timeout</Divider>
                <p>Adjust this value to give more time for PIs to respond when scanning</p>
                <Form.Group widths="equal">
                    <Form.Field error={!validator.validatePingTimeout().isValid}>
                        <Form.Input label="Ping timeout (milliseconds)" placeholder="250" value={this.state.pingTimeout} onChange={(e: any) => this.setState({ pingTimeout: e.target.value })} />
                        {!validator.validatePingTimeout().isValid && <Label basic color="red" pointing>{validator.validatePingTimeout().errorMessage}</Label>}
                    </Form.Field>
                </Form.Group>
                <Divider horizontal>Playback buffer</Divider>
                <p>Increase this value to allow more time for devices to sync with the manager clock before playback.</p>
                <Form.Group widths="equal">
                    <Form.Field error={!validator.validatePlaybackBuffer().isValid}>
                        <Form.Input label="Playback buffer (milliseconds)" placeholder="10000" value={this.state.playbackBuffer} onChange={(e: any) => this.setState({ playbackBuffer: e.target.value })} />
                        {!validator.validatePlaybackBuffer().isValid && <Label basic color="red" pointing>{validator.validatePlaybackBuffer().errorMessage}</Label>}
                    </Form.Field>
                </Form.Group>
                <Button disabled={!validator.validateState().isValid} color="green" onClick={(e: any) => {
                    e.preventDefault();
                    this.props.saveSettings(this.state.editIpStart, this.state.editIpEnd, this.state.pingTimeout, this.state.playbackBuffer);
                }}>Save</Button>
            </Form>
        </div>;
    }

    public componentDidMount() {
        this.props.fetchSettings();
    }

    public componentWillReceiveProps(nextProps: ISettingsProps) {
        this.setState({
            editIpStart: nextProps.appPreferences.deviceSearchStartIp,
            editIpEnd: nextProps.appPreferences.deviceSearchEndIp,
            pingTimeout: nextProps.appPreferences.pingTimeout,
            playbackBuffer: nextProps.appPreferences.playbackBuffer
         });
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
    fetchSettings?: () => void;
    saveSettings?: (ipStart: string, ipFinish: string, pingTimeout: number, playbackBuffer: number) => void;
    appPreferences?: ApiClient.AppPreferences;
}

export interface ISettingsLocalState {
    editIpStart?: string;
    editIpEnd?: string;
    pingTimeout?: number;
    playbackBuffer?: number;
}
