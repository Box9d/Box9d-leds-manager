import * as React from "react";
import { Button, Container, Divider, Grid, Header, Input, Label, Menu, Modal, Segment } from "semantic-ui-react";
import * as ApiClient from "../../../../../api/build/ApiClient";
import BackgroundJobs from "./backgroundjobs/BackgroundJobsContainer";
import BackgroundJobsStatus from "./backgroundjobs/BackgroundJobsStatusContainer";
import DevicesConfigurationStatus from "./devices/DevicesConfigurationStatusContainer";
import DevicesOverview from "./devices/DevicesOverviewContainer";
import "./ProjectOverviewStyles.scss";
import SelectVideo from "./video/SelectVideoContainer";
import VideoConfigurationStatus from "./video/VideoConfigurationStatusContainer";
import Playback from "./playback/PlaybackContainer";

export class ProjectOverviewPresenter extends React.Component<IProjectOverviewProps, IProjectOverviewState> {

    constructor(props: IProjectOverviewProps) {
        super(props);

        this.state = {selectedNavigationItem: ""};
    }

    public render() {
        return <div className="page-content relative" >
            <Header as="h1" textAlign="center">
                {this.props.project.name}
            </Header>
            <Label as="a" className="close-project" corner="right" icon="close" onClick={this.props.closeProject} />
            <Divider />
            <Container>
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical>
                        <Menu.Item name="Video" active={this.state.selectedNavigationItem === "video"} onClick={(e: any) => this.selectNavigationItem("video")}>
                            Video
                            <VideoConfigurationStatus/>
                        </Menu.Item>
                        <Menu.Item name="Devices" active={this.state.selectedNavigationItem === "devices"} onClick={(e: any) => this.selectNavigationItem("devices")}>
                            Devices
                            <DevicesConfigurationStatus/>
                        </Menu.Item>
                        <Menu.Item name="BackgroundJobs" active={this.state.selectedNavigationItem === "backgroundjobs"} onClick={(e: any) => this.selectNavigationItem("backgroundjobs")}>
                            Background Jobs
                            <BackgroundJobsStatus/>
                        </Menu.Item>
                        <Menu.Item name="Playback" active={this.state.selectedNavigationItem === "playback"} onClick={(e: any) => this.selectNavigationItem("playback")}>
                            Playback
                        </Menu.Item>
                    </Menu>
                </Grid.Column> 
                <Grid.Column stretched width={12}>
                    {
                        this.state.selectedNavigationItem === "video" &&
                        <Segment>
                            <SelectVideo/>
                        </Segment>
                    }
                    {
                        this.state.selectedNavigationItem === "devices" &&
                        <Segment>
                            <DevicesOverview/>
                        </Segment>
                    }
                    {
                        this.state.selectedNavigationItem === "backgroundjobs" &&
                        <Segment>
                            <BackgroundJobs/>
                        </Segment>
                    }
                    {
                        this.state.selectedNavigationItem === "playback" &&
                        <Segment>
                            <Playback/>
                        </Segment>
                    }
                </Grid.Column>         
            </Grid>
            </Container>
        </div>;
    }

    private selectNavigationItem(item: string): void {
        this.setState({selectedNavigationItem: item});
    }
}

export interface IProjectOverviewProps {
    closeProject?: () => void;
    project?: ApiClient.Project;
}

export interface IProjectOverviewState {
    selectedNavigationItem: string;
}
