import * as React from "react";
import { Button, Container, Divider, Form, Grid, Header, Rail, Segment } from "semantic-ui-react";
import NewProjectForm from "../containers/NewProjectFormContainer";
import OpenProject from "../containers/OpenProjectContainer";
import ProjectOverview from "../containers/ProjectOverviewContainer";

export class HomePresenter extends React.Component<IHomeProps, undefined> {
    public render() {
        if (this.props.selectedNavItem !== "home") {
            return <div></div>;
        }

        if (!this.props.hasCheckedForWorkingProject) {
            return <div></div>;
        }

        if (this.props.hasCheckedForWorkingProject && this.props.hasWorkingProject) {
            return <ProjectOverview/>;
        }

        return <div>
            <Header as="h3" dividing textAlign="center">
                Box 9D LED Configuration Manager
            </Header>
            <br/>
            <br/>
            <Grid columns={3}>
                <Grid.Column> 
                    <Header as="h4">Create a new project</Header>
                    <NewProjectForm/>
                </Grid.Column>
                <Grid.Column>
                    <Divider vertical clearing>Or</Divider>
                </Grid.Column>
                <Grid.Column>   
                    <OpenProject/>
                </Grid.Column>
            </Grid>   
        </div>;
    }

    public componentDidMount(): void {
        if (!this.props.hasCheckedForWorkingProject) {
            this.props.checkForWorkingProject();
        }
    }
}

export interface IHomeProps {
    hasWorkingProject?: boolean;
    hasCheckedForWorkingProject?: boolean;
    checkForWorkingProject?: () => void;
    selectedNavItem?: string;
}
