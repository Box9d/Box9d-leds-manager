import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

export class Actions {
    public static SetBackgroundJobs = "SET_BACKGROUND_JOBS";
}

export const StartPollingBackgroundJobs = (dispatch: any, projectId: number): IAction => {
    // todo:
    return {
        type: "DO_NOTHING",
    };
};

const SetBackgroundJobs = (jobs: ApiClient.BackgroundJob[]): IAction => {
    return {
        type: Actions.SetBackgroundJobs,
        value: jobs,
    };
};

export const StopPollingBackgroundJobs = (dispatch: any): IAction => {
    // todo:
    return {
        type: "DO_NOTHING",
    };
};

const ClearBackgroundJobs = (): IAction => {
    return {
        type: Actions.SetBackgroundJobs,
        value: new Array<ApiClient.BackgroundJob>()
    };
};
