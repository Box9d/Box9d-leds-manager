import * as ApiClient from "../../../../api/build/ApiClient";
import { IAction } from "../../actions/IAction";
import config from "../../Config";
import * as MessageActions from "../messages/MessageActions";
import { MessageType } from "../messages/MessagingState";

export class Actions {
    public static SetBackgroundJobs = "SET_BACKGROUND_JOBS";
}

export const FetchBackgroundJobs = (dispatch: any): IAction => {

    let apiClient = new ApiClient.BackgroundJobsClient(config.apiUrl);
    apiClient.getAllJobs(false).then((response: ApiClient.GlobalJsonResultOfIEnumerableOfBackgroundJob) => {
        if (response.successful) {
            dispatch(MessageActions.ClearMessage());
            dispatch(SetBackgroundJobs(response.result));
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Error whilst trying to retrieve background jobs", MessageType.Error));
        }
    });

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
