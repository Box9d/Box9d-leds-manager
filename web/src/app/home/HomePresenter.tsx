import * as React from "react";
import { Button, Container, Divider, Form, Grid, Header, Rail, Segment } from "semantic-ui-react";
import OpenProject from "./existingproject/OpenProjectContainer";
import NewProjectForm from "./newproject/NewProjectFormContainer";
import ProjectOverview from "./workingproject/ProjectOverviewContainer";
import "./HomeStyles.scss"

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
            <Grid columns={2}>
                <Grid.Column className="home-column"> 
                    <Header as="h3" textAlign="center">Create a new project</Header>
                        <Divider />
                    <NewProjectForm/>
                </Grid.Column>
                <Divider vertical>Or</Divider>
                <Grid.Column className="home-column">   
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
