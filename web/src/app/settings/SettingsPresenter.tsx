import * as React from "react";
import { Button, Divider, Form, Header, Input } from "semantic-ui-react";
import * as ApiClient from "../../../../api/build/ApiClient";
import config from "../../Config";
import { ISettingsState, SettingsState } from "./SettingsState";
import "./SettingsStyles.scss";

export class SettingsPresenter extends React.Component<ISettingsProps, ISettingsState> {
    constructor(props: any) {
        super(props);

        this.handleStartIpChange = this.handleStartIpChange.bind(this);
        this.handleEndIpChange = this.handleEndIpChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = new SettingsState();
    }

    public handleStartIpChange(event: any) {
        this.setState({
            isStartIpChanged: true,
            startIp: event.target.value,
        });
    }

    public handleEndIpChange(event: any) {
        this.setState({
            endIp: event.target.value,
            isEndIpChanged: true,
        });
    }

    public refresh() {
        this.setState({
            isLoading: true,
        });
        let apiClient = new ApiClient.AppPreferencesClient(config.apiUrl);
        apiClient.getAll().then((response: ApiClient.GlobalJsonResultOfAppPreferences) => {
            if (response.successful) {
                this.setState({
                    endIp: response.result.deviceSearchEndIp,
                    isEndIpChanged: false,
                    isLoading: false,
                    isStartIpChanged: false,
                    startIp: response.result.deviceSearchStartIp,
                });
            }
        });
    }

    public handleCancel(event: any) {
        event.preventDefault();
        this.refresh();
    }

    public handleSubmit(event: any) {
        event.preventDefault();

        this.setState({
            isLoading: true,
        });
        let appPreferences = new ApiClient.AppPreferences();
        appPreferences.deviceSearchStartIp = this.state.startIp;
        appPreferences.deviceSearchEndIp = this.state.endIp;
        let apiClient = new ApiClient.AppPreferencesClient(config.apiUrl);
        apiClient.updatePreferences(appPreferences).then((response: ApiClient.GlobalJsonResultOfAppPreferences) => {
            if (response.successful) {
                this.setState({
                    isEndIpChanged: false,
                    isLoading: false,
                    isStartIpChanged: false,
                });
                return;
            }
        });
    }

    public render() {
        if (this.props.selectedNavItem !== "settings") {
            return <div></div>;
        }

        return <div>
            <Header as="h1">Settings</Header>
            <Form onSubmit={this.handleSubmit}>
                <fieldset disabled={this.state.isLoading}>
                    <Divider horizontal>IP addresses</Divider>
                    <Form.Group widths="equal">
                        <Form.Input name="start-ip" label="Device search start IP" placeholder="Device search start IP" value={this.state.startIp} onChange={this.handleStartIpChange} className={this.state.isStartIpChanged ? "input-unsaved" : ""} />
                        <Form.Input name="end-ip" label="Device search end IP" placeholder="Device search end IP" value={this.state.endIp} onChange={this.handleEndIpChange} className={this.state.isEndIpChanged ? "input-unsaved" : ""} />
                    </Form.Group>    
                    <Divider horizontal>Other stuff</Divider>
                    <Form.Input name="more-stuff" label="More stuff" placeholder="More stuff" />
                    <Button color="red" onClick={(e) => this.handleCancel(e)}>Cancel</Button>
                    <Button color="green" type="submit">Save</Button>
                </fieldset>
            </Form>
        </div>;
    }

    public componentWillMount() {
        this.refresh();
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
}
