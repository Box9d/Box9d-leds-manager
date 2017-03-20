import * as ApiClient from "../../../../api/build/ApiClient";

export interface IBackgroundJobsState {
    BackgroundJobs: ApiClient.BackgroundJob[];
}

export class BackgroundJobsState implements IBackgroundJobsState {
    public BackgroundJobs: ApiClient.BackgroundJob[];

    constructor() {
        this.BackgroundJobs = new Array<ApiClient.BackgroundJob>();
    }
}
