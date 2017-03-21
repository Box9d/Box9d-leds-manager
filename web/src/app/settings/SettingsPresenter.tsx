import * as React from "react";
import { Button, Divider, Form, Header, Input } from "semantic-ui-react";
import { ISettingsState } from "src/app/settings/SettingsState";

export class SettingsPresenter extends React.Component<ISettingsProps, ISettingsState> {

    constructor(props: ISettingsProps) {
        super(props);

        this.state = { editIpStart: this.props.ipAddressStart, editIpEnd: this.props.ipAddressEnd };
    }

    public render() {
        return <div>
            <Header as="h1">Settings</Header>
            <Form>
                <Divider horizontal>IP addresses</Divider>
                <Form.Group widths="equal">
                    <Form.Input label="IP start" placeholder="IP start" value={this.state.editIpStart} onChange={(e: any) => this.setState({editIpStart: e.target.value})} error={this.state.editIpStart == null || this.state.editIpStart.length === 0 }/>
                    <Form.Input label="IP end" placeholder="IP end" value={this.state.editIpEnd} onChange={(e: any) => this.setState({editIpEnd: e.target.value})} error={this.state.editIpEnd == null || this.state.editIpEnd.length === 0 }/>
                </Form.Group>
                <Divider horizontal>Other stuff</Divider>
                <Form.Input label="More stuff" placeholder="More stuff" />
                <Button color="green" onClick={(e: any) => {e.preventDefault(); this.props.saveSettings(this.state.editIpStart, this.state.editIpEnd); }}>Save</Button>
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