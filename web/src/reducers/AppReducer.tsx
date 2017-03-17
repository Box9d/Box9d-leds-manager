import { IAction } from "../actions/IAction";
import { MessageReducer } from "../reducers/MessageReducer";
import { AppState } from "../state/AppState";
import { IAppState } from "../state/AppState";
import { BackgroundJobsReducer } from "./BackgroundJobsReducer";
import { NavReducer } from "./NavReducer";
import { NewProjectFormReducer } from "./NewProjectFormReducer";
import { OpenProjectReducer } from "./OpenProjectReducer";
import { WorkingProjectReducer } from "./WorkingProjectReducer";

export const appReducer = (state: IAppState = new AppState(), action: IAction): IAppState => {
    let newState: IAppState = state;
    newState.NavState = NavReducer(newState.NavState, action);
    newState = BackgroundJobsReducer(newState, action);
    newState.NewProjectFormState = NewProjectFormReducer(newState.NewProjectFormState, action);
    newState.MessageState = MessageReducer(state.MessageState, action);
    newState.OpenProjectState = OpenProjectReducer(state.OpenProjectState, action);
    newState.WorkingProjectState = WorkingProjectReducer(state.WorkingProjectState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
