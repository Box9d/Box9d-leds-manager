import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IBackgroundJobsState {
    Jobs: ApiClient.BackgroundJob[];
};

export class BackgroundJobsState implements IBackgroundJobsState {
    public Jobs: ApiClient.BackgroundJob[];

    constructor() {
        this.Jobs = new Array<ApiClient.BackgroundJob>();
    }
}
