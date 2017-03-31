import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

let isPolling = false;

export class Actions {
    public static SetBackgroundJobs = "SET_BACKGROUND_JOBS";
}

export const StartPollingBackgroundJobs = (dispatch: any, projectId: number): IAction => {
    isPolling = true;

    dispatch(FetchBackgroundJobs(dispatch, projectId));

    return {
        type: "DO_NOTHING",
    };
};

const FetchBackgroundJobs = (dispatch: any, projectId: number): IAction => {

    if (isPolling) {
        let backgroundJobsClient = new ApiClient.BackgroundJobsClient(config.apiUrl);
        backgroundJobsClient.getAllJobsForProject(projectId, true).then((response: ApiClient.GlobalJsonResultOfIEnumerableOfBackgroundJob) => {
            if (!response.successful) {
                dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve background jobs: " + response.errorMessage, MessageType.Error));
            } else {
                dispatch(SetBackgroundJobs(response.result));
                setTimeout(() => { dispatch(FetchBackgroundJobs(dispatch, projectId)); }, config.backgroundJobsScanPollPeriodInMilliseconds);
            }
        });
    }

    return {
        type: "DO_NOTHING",
    };
}

const SetBackgroundJobs = (jobs: ApiClient.BackgroundJob[]): IAction => {
    return {
        type: Actions.SetBackgroundJobs,
        value: jobs,
    };
};

export const StopPollingBackgroundJobs = (): IAction => {
    isPolling = false;

    return ClearBackgroundJobs();
};

const ClearBackgroundJobs = (): IAction => {
    return {
        type: Actions.SetBackgroundJobs,
        value: new Array<ApiClient.BackgroundJob>()
    };
};
