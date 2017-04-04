import * as React from "react";
import { Divider, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import Playback from "./PlaybackContainer";
import "./PlaybackStyles.scss";

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
                <Button primary onClick={() => { this.props.setIsLoaded(true); }}>Load</Button>
                <Button color="green">Play</Button>
                <Segment>
                    {
                        this.props.devices.map((d: ApiClient.Device) => {
                            return <Grid columns="equal" verticalAlign="middle" key={d.id}>
                                <Grid.Row className={this.props.isLoaded ? "playback-device-loaded" : "playback-device-not-loaded"}>
                                    <Grid.Column width={12}>
                                        {d.name != null && d.name !== "" ? d.name : "unknown name"}{" (" + d.ipAddress + ")"}
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
        this.props.fetchDevices(this.props.projectId);
    }
}

export interface IPlaybackProps {
    projectId?: number;
    devices?: ApiClient.Device[];
    fetchDevices?: (projectId: number) => void;
    isLoaded?: boolean;
    setIsLoaded?: (value: boolean) => void;
}