import * as React from "react";
import { Divider, Header, Table, Segment, Grid, Button, Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../../api/build/ApiClient";

export class PlaybackDeviceStatusPresenter extends React.Component<IPlaybackDeviceStatusProps, undefined> {

    constructor(props: IPlaybackDeviceStatusProps) {
        super(props);
    }

    public render() {
        return <Label>{this.props.projectDevicePlaybackStatus}</Label>;
    }

    public componentDidMount() {
        this.props.fetchProjectDevicePlaybackStatus(this.props.projectDeviceId);
    }
}

export interface IPlaybackDeviceStatusProps {
    projectDeviceId?: number;
    projectDevicePlaybackStatus?: ApiClient.ProjectDevicePlaybackStatus;
    fetchProjectDevicePlaybackStatus?: (projectDeviceId: number) => void;
}
