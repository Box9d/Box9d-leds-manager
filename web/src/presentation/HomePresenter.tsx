import * as React from "react";
import { Button, Container, Divider, Form, Grid, Header, Rail, Segment } from "semantic-ui-react";
import NewProjectForm from "../containers/NewProjectFormContainer";

export class HomePresenter extends React.Component<IHomeProps, undefined> {
    public render() {
        if (this.props.selectedNavItem !== "home") {
            return <div></div>;
        }

        return <div>
            <Header as="h3" dividing>
                Box 9D LED Configuration Manager
            </Header>
            <br/>
            <br/>
            <Grid columns={3}>
                <Grid.Column>
                    <Segment padded raised floated="left">      
                        <Header as="h4">Create a new project</Header>
                            <NewProjectForm/>
                        <Divider horizontal>Or</Divider>
                        <Button secondary fluid>Open an existing project</Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>;
    }
}

export interface IHomeProps {
    selectedNavItem?: string;
}
