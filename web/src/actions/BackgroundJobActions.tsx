import * as ApiClient from "../../../api/build/ApiClient";
import { IAction } from "./IAction";

export class Actions {
    public static SetBackgroundJobs = "SET_BACKGROUND_JOBS";
}

export const FetchBackgroundJobs = (dispatch: any): IAction => {

    // todo: fetch using API and set message

    // temp
    let temporaryJobs = new Array<ApiClient.BackgroundJob>();
    let temporaryJob = new ApiClient.BackgroundJob();
    temporaryJob.description = "Doing something...";
    temporaryJob.status = ApiClient.JobStatus.Processing;
    temporaryJobs.push(temporaryJob);

    dispatch(SetBackgroundJobs(temporaryJobs));

    return {
        type: "DO_NOTHING",
        value: null,
    };
};

export const SetBackgroundJobs = (jobs: ApiClient.BackgroundJob[]) => {
    return {
        type: Actions.SetBackgroundJobs,
        value: jobs,
    };
};
