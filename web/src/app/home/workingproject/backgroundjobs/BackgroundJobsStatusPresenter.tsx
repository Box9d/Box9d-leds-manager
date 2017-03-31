import * as React from "react";
import { Label } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import BackgroundJobsStatus from "./BackgroundJobsStatusContainer";

export class BackgroundJobsStatusPresenter extends React.Component<IBackgroundJobsStatusProps, undefined> {

    constructor(props: IBackgroundJobsStatusProps) {
        super(props);
    }

    public render() {

        let incompleteJobCount = 0;
        for (let job of this.props.backgroundJobs) {
            if (job.status !== ApiClient.JobStatus.Complete) {
                incompleteJobCount++;
            }
        }

        return <Label color={incompleteJobCount > 0 ? "blue" : "green"}>{incompleteJobCount}</Label>;
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
