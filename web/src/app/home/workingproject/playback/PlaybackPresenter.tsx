import * as React from "react";
import { Divider, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import Playback from "./PlaybackContainer";
import { DeviceWithStatus } from "../devices/DevicesOverviewState";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs";

export class PlaybackPresenter extends React.Component<IPlaybackProps, IPlaybackState> {

    constructor(props: IPlaybackProps) {
        super(props);

        this.state = {requiresReload: false, canLoad: true};
    }

    public render() {
        let allDevicesReady = this.props.devices.length > 0 && !this.props.devices.some((d) => d.PlaybackStatus !== ApiClient.ProjectDevicePlaybackStatus.Ready);
        return <div>
            <Divider horizontal>Playback</Divider>
            {
                this.props.devices.length > 0 &&
                <div>
                    <Button primary disabled={!this.state.canLoad} onClick={this.load}>Load</Button>
                    <Button color="green" disabled={!allDevicesReady || this.props.isPlaying || this.state.requiresReload} onClick={this.play}>Play</Button>
                    <Button color="red" disabled={!allDevicesReady || !this.props.isPlaying} onClick={this.stop}>Stop</Button>
                    <Segment>
                        {
                            this.props.devices.map((d: DeviceWithStatus) => {
                                let labelColor: SemanticCOLORS;
                                switch (d.PlaybackStatus) {
                                    case ApiClient.ProjectDevicePlaybackStatus.NotOnline:
                                        labelColor = "red";
                                        break;
                                    case ApiClient.ProjectDevicePlaybackStatus.NotReady:
                                        labelColor = "yellow";
                                        break;
                                    case ApiClient.ProjectDevicePlaybackStatus.Ready:
                                        labelColor = "green";
                                        break;
                                }
                                return <Grid columns="equal" verticalAlign="middle" key={d.Device.id}>
                                    <Grid.Row>
                                        <Grid.Column width={12}>
                                            {d.Device.name != null && d.Device.name !== "" ? d.Device.name : "unknown name"}{" (" + d.Device.ipAddress + ")"}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {d.PlaybackStatus != null && <Label color={labelColor}>{ApiClient.ProjectDevicePlaybackStatus[d.PlaybackStatus]}</Label>}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>;
                            })
                        }
                    </Segment>
                </div>
            }
            {
                this.props.devices.length === 0 &&
                <p><em>Project does not yet have any devices</em></p>
            }
        </div>;
    }

    public load = () => {
        this.setState({requiresReload: false, canLoad: false});

        this.refreshPlaybackStatuses();
    }

    public play = () => {
        this.setState({requiresReload: true});

        this.props.play(this.props.projectId);
    }

    public stop = () => {
        this.props.stop(this.props.projectId);

        this.setState({canLoad: true});
    }

    public refreshPlaybackStatuses() {
        this.props.devices.forEach((d) => {
            this.props.fetchProjectDevicePlaybackStatus(d.Device.id, this.props.projectId);
        });
    }
}

export interface IPlaybackProps {
    projectId?: number;
    devices?: DeviceWithStatus[];
    fetchProjectDevicePlaybackStatus?: (deviceId: number, projectId: number) => void;
    play?: (projectDeviceId: number) => void;
    stop?: (projectDeviceId: number) => void;
    isPlaying?: boolean;
}

export interface IPlaybackState {
    canLoad?: boolean;
    requiresReload?: boolean;
}
