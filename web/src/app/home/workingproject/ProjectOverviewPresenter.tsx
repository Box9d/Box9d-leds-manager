import * as React from "react";
import { Button, Container, Divider, Grid, Header, Label, Menu, Modal, Segment } from "semantic-ui-react";
import * as ApiClient from "../../../../../api/build/ApiClient";
import DevicesOverview from "./devices/DevicesOverviewContainer";
import SelectVideo from "./video/SelectVideoContainer";
import VideoConfigurationStatus from "./video/VideoConfigurationStatusContainer";

export class ProjectOverviewPresenter extends React.Component<IProjectOverviewProps, IProjectOverviewState> {

    constructor(props: IProjectOverviewProps) {
        super(props);

        this.state = {selectedNavigationItem: ""};
    }

    public render() {
        return <div>
            <Grid columns={3}>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                    <Header as="h3" textAlign="center">
                        {this.props.project.name}
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Button floated="right" circular icon="close" onClick={this.props.closeProject} />
                </Grid.Column>
            </Grid>
            <br/>
            <br/>
            <br/>
            <Container>
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name="Video" active={this.state.selectedNavigationItem === "video"} onClick={(e: any) => this.selectNavigationItem("video")}>
                            Video
                            <VideoConfigurationStatus/>
                        </Menu.Item>
                        <Menu.Item name="Devices" active={this.state.selectedNavigationItem === "devices"} onClick={(e: any) => this.selectNavigationItem("devices")}>
                            <Label color="blue">0</Label>
                            Devices
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