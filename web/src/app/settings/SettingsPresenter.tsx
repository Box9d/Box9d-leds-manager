import * as React from "react";
import { Button, Divider, Form, Header, Input } from "semantic-ui-react";

export class SettingsPresenter extends React.Component<ISettingsProps, undefined> {
    public render() {
        if (this.props.selectedNavItem !== "settings") {
            return <div></div>;
        }

        return <div className="page-content">
            <Header as="h1">Settings</Header>
            <Form>
                <Divider horizontal>IP addresses</Divider>
                <Form.Group widths="equal">
                    <Form.Input label="IP start" placeholder="IP start" />
                    <Form.Input label="IP end" placeholder="IP end" />
                </Form.Group>    
                <Divider horizontal>Other stuff</Divider>
                <Form.Input label="More stuff" placeholder="More stuff" />
                <Button color="red">Cancel</Button>
                <Button color="green">Save</Button>
            </Form>
        </div>;
    }
}

export interface ISettingsProps {
    selectedNavItem?: string;
}
