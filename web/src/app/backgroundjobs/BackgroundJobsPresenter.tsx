import * as React from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../api/build/ApiClient";
import BackgroundJobs from "./BackgroundJobsContainer";

export class BackgroundJobsPresenter extends React.Component<IBackgroundJobsProps, undefined> {

    constructor(props: IBackgroundJobsProps) {
        super(props);
    }

    public componentDidMount() {
        this.refreshJobsInXSeconds(0);
    }

    public refreshJobsInXSeconds(seconds: number) {
        if (this.props.selectedMenuItem === "backgroundjobs") {
            setTimeout(this.props.refreshJobs, seconds * 1000);
        }
    }

    public render() {
        if (this.props.selectedMenuItem !== "backgroundjobs") {
            return <div></div>;
        }

        this.refreshJobsInXSeconds(5); // Should refresh job list every 5 seconds

        return  <div><Table celled>
            <Table.Header>
                <Table.Row>
                <Table.HeaderCell>Job Description</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Latest Error</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {this.props.backgroundJobs.map((job: ApiClient.BackgroundJob) => {
                    return <Table.Row key={job.id} error={job.status === ApiClient.JobStatus.Failed}>
                        <Table.Cell>{job.description}</Table.Cell>
                        <Table.Cell>{ApiClient.JobStatus[job.status]}</Table.Cell>
                        <Table.Cell>{job.latestError}</Table.Cell>
                    </Table.Row>;
                })}
            </Table.Body>
            </Table>
            </div>;
    }
}

export interface IBackgroundJobsProps {
    selectedMenuItem?: string;
    backgroundJobs?: ApiClient.BackgroundJob[];
    refreshJobs?: () => void;
}
