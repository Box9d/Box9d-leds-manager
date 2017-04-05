import * as React from "react";
import { Divider, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import Playback from "./PlaybackContainer";
import { DeviceWithStatus } from "../devices/DevicesOverviewState";
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs";

export class PlaybackPresenter extends React.Component<IPlaybackProps, undefined> {

    constructor(props: IPlaybackProps) {
        super(props);
    }

    public render() {
        let allDevicesReady = this.props.devices.length > 0 && !this.props.devices.some((d) => d.PlaybackStatus !== ApiClient.ProjectDevicePlaybackStatus.Ready);
        return <div>
            <Divider horizontal>Playback</Divider>
            {
                this.props.devices.length > 0 &&
                <div>
                    <Button primary onClick={() => this.refreshPlaybackStatuses()}>Load</Button>
                    <Button color="green" disabled={!allDevicesReady || this.props.isPlaying} onClick={() => this.props.play(this.props.projectId)}>Play</Button>
                    <Button color="red" disabled={!allDevicesReady || !this.props.isPlaying} onClick={() => this.props.stop(this.props.projectId)}>Stop</Button>
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

    public componentDidMount() {
        this.refreshPlaybackStatuses();
    }

    private refreshPlaybackStatuses() {
        this.props.devices.forEach((d) => {
            this.props.fetchProjectDevicePlaybackStatus(d.Device.id, this.props.projectId);
        })
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
