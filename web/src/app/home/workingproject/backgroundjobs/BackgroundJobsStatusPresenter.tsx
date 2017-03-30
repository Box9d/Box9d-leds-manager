import * as React from "react";
import { Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import BackgroundJobsStatus from "./BackgroundJobsStatusContainer";

export class BackgroundJobsStatusPresenter extends React.Component<IBackgroundJobsStatusProps, undefined> {

    constructor(props: IBackgroundJobsStatusProps) {
        super(props);
    }

    public render() {
        return <Label color={this.props.backgroundJobs.length > 0 ? "blue" : "green"}>{this.props.backgroundJobs.length}</Label>;
    }

    public componentDidMount() {
        this.props.startPollingBackgroundJobs(this.props.projectId);
    }

    public componentWillUnmount() {
        this.props.stopPollingBackgroundJobs();
    }
}

export interface IBackgroundJobsStatusProps {
    projectId?: number;
    backgroundJobs?: ApiClient.BackgroundJob[];
    startPollingBackgroundJobs?: (projectId: number) => void;
    stopPollingBackgroundJobs?: () => void;
}
