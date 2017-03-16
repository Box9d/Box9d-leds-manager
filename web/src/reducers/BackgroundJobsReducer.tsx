import { Actions } from "../actions/BackgroundJobActions";
import { IAction } from "../actions/IAction";
import { IAppState } from "../state/AppState";

export const BackgroundJobsReducer = (state: IAppState, action: IAction): IAppState => {
    let newState: IAppState = state;

    switch (action.type) {
        case Actions.SetBackgroundJobs:
            newState.BackgroundJobsState.BackgroundJobs = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
