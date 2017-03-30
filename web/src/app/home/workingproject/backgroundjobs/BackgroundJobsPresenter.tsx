import * as React from "react";
import { Divider, Header, Table } from "semantic-ui-react";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import BackgroundJobs from "./BackgroundJobsContainer";

export class BackgroundJobsPresenter extends React.Component<IBackgroundJobsProps, undefined> {

    constructor(props: IBackgroundJobsProps) {
        super(props);
    }

    public render() {
        return <div>
            <Divider horizontal>Background Jobs</Divider>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Project device version ID</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Info</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.backgroundJobs.map((job: ApiClient.BackgroundJob) => {
                        return <Table.Row key={job.id} error={job.status === ApiClient.JobStatus.Failed}>
                            <Table.Cell>{job.projectDeviceVersionId}</Table.Cell>
                            <Table.Cell>{ApiClient.JobStatus[job.status]}</Table.Cell>
                            <Table.Cell>{job.lastError}</Table.Cell>
                        </Table.Row>;
                    })}
                    {!this.props.backgroundJobs.length && <Table.Row><Table.Cell colSpan="3"><em>Currently no jobs running</em></Table.Cell></Table.Row>}
                </Table.Body>
            </Table>
        </div>;
    }
}

export interface IBackgroundJobsProps {
    projectId?: number;
    backgroundJobs?: ApiClient.BackgroundJob[];
    fetchBackgroundJobs?: (projectId: number) => void;
}
