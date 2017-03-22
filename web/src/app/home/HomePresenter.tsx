import * as React from "react";
import { Button, Container, Divider, Form, Grid, Header, Rail, Segment } from "semantic-ui-react";
import OpenProject from "./existingproject/OpenProjectContainer";
import NewProjectForm from "./newproject/NewProjectFormContainer";
import ProjectOverview from "./workingproject/ProjectOverviewContainer";

export class HomePresenter extends React.Component<IHomeProps, undefined> {
    public render() {
        if (!this.props.hasCheckedForWorkingProject) {
            return <div></div>;
        }

        if (this.props.hasCheckedForWorkingProject && this.props.hasWorkingProject) {
            return <ProjectOverview/>;
        }

        return <div className="page-content">
            <Header as="h1">Box 9D LED configuration manager</Header>
            <Divider />
            <br/>
            <br/>
            <Grid columns={3}>
                <Grid.Column width={7}> 
                    <Header as="h3" textAlign="center">Create a new project</Header>
                        <Divider />
                    <NewProjectForm/>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Divider vertical clearing>Or</Divider>
                </Grid.Column>
                <Grid.Column width={7}>   
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
