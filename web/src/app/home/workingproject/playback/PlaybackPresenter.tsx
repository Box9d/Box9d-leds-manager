import * as React from "react";
import { Checkbox, Divider, Form, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import Playback from "./PlaybackContainer";
import { DeviceWithStatus } from "../devices/DevicesOverviewState";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs";

export class PlaybackPresenter extends React.Component<IPlaybackProps, IPlaybackState> {

    constructor(props: IPlaybackProps) {
        super(props);

        this.state = { requiresReload: false, canLoad: true };
    }

    public render() {
        let allDevicesReady = this.props.devices.length > 0 && !this.props.devices.some(
            (d) => d.PlaybackStatus !== ApiClient.ProjectDevicePlaybackStatus.Ready && d.PlaybackStatus !== ApiClient.ProjectDevicePlaybackStatus.Bypassed);
        return <div>
            <Divider horizontal>Playback</Divider>
            {
                this.props.devices.length > 0 &&
                <div>
                    <Button primary disabled={!this.state.canLoad} onClick={this.load}>Load</Button>
                    <Button color="green" disabled={!allDevicesReady || this.props.isPlaying || this.state.requiresReload || !this.props.isAudioLoaded} onClick={this.play}>Play</Button>
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
                                    case ApiClient.ProjectDevicePlaybackStatus.Bypassed:
                                        labelColor = "grey";
                                }
                                return <Grid columns="equal" verticalAlign="middle" key={d.Device.id}>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            {d.Device.name != null && d.Device.name !== "" ? d.Device.name : "unknown name"}{" (" + d.Device.ipAddress + ")"}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <Form.Field>
                                                <Checkbox toggle label="Bypass" checked={d.PlaybackStatus === ApiClient.ProjectDevicePlaybackStatus.Bypassed} 
                                                onClick={(e: any) => this.bypassDevice(d.Device.id, d.PlaybackStatus !== ApiClient.ProjectDevicePlaybackStatus.Bypassed)}/>
                                            </Form.Field>
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
        this.setState({ requiresReload: false, canLoad: false });

        this.refreshPlaybackStatuses();
        this.props.loadAudio(this.props.projectId);
    }

    public play = () => {
        this.setState({ requiresReload: true });

        this.props.play(this.props.projectId);
    }

    public stop = () => {
        this.props.stop(this.props.projectId);
        this.props.unloadAudio();

        this.setState({ canLoad: true });
    }

    public bypassDevice = (deviceId: number, bypass: boolean) => {
        this.props.bypassDevice(this.props.projectId, deviceId, bypass);
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
    loadAudio?: (projectId: number) => void;
    unloadAudio?: () => void;
    bypassDevice?: (projectId: number, deviceId: number, bypass: boolean) => void;
    isAudioLoaded?: boolean;
    play?: (projectDeviceId: number) => void;
    stop?: (projectDeviceId: number) => void;
    isPlaying?: boolean;
}

export interface IPlaybackState {
    canLoad?: boolean;
    requiresReload?: boolean;
}
