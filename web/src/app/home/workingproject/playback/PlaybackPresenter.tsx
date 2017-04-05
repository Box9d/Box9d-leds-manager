import * as React from "react";
import { Divider, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import Playback from "./PlaybackContainer";
import { DeviceWithStatus } from "../devices/DevicesOverviewState";

export class PlaybackPresenter extends React.Component<IPlaybackProps, undefined> {

    constructor(props: IPlaybackProps) {
        super(props);
    }

    public render() {
        return <div>
            <Divider horizontal>Playback</Divider>
            {
                this.props.devices.length > 0 &&
                <div>
                    <Button primary>Load</Button>
                    <Button color="green">Play</Button>
                    <Segment>
                        {
                            this.props.devices.map((d: DeviceWithStatus) => {
                                return <Grid columns="equal" verticalAlign="middle" key={d.Device.id}>
                                    <Grid.Row>
                                        <Grid.Column width={12}>
                                            {d.Device.name != null && d.Device.name !== "" ? d.Device.name : "unknown name"}{" (" + d.Device.ipAddress + ")"}
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {ApiClient.ProjectDevicePlaybackStatus[d.PlaybackStatus]}
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
        this.props.devices.forEach((d) => {
            this.props.fetchProjectDevicePlaybackStatus(d.Device.id);
        })
    }
}

export interface IPlaybackProps {
    devices?: DeviceWithStatus[];
    fetchProjectDevicePlaybackStatus?: (projectDeviceId: number) => void;
}
