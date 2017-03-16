import { IAction } from "../actions/IAction";
import { NavReducer } from "../reducers/NavReducer";
import { DefaultAppState } from "../state/AppState";
import { IAppState } from "../state/AppState";
import { BackgroundJobsReducer } from "./BackgroundJobsReducer";

export const appReducer = (state: IAppState = new DefaultAppState(), action: IAction): IAppState => {
    let newState: IAppState = state;
    newState.NavState = NavReducer(newState.NavState, action);
    newState = BackgroundJobsReducer(newState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
