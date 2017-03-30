import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import { Actions } from "./BackgroundJobsActions";
import { IBackgroundJobsState } from "./BackgroundJobsState";

export const BackgroundJobsReducer = (state: IBackgroundJobsState, action: IAction): IBackgroundJobsState => {
    let newState: IBackgroundJobsState = state;

    switch (action.type) {
        case Actions.SetBackgroundJobs:
            newState.Jobs = action.value;
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
