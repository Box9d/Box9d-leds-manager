import { IAction } from "../actions/IAction";
import { MessageReducer } from "../reducers/MessageReducer";
import { AppState } from "../state/AppState";
import { IAppState } from "../state/AppState";
import { NavReducer } from "./NavReducer";
import { NewProjectFormReducer } from "./NewProjectFormReducer";

export const appReducer = (state: IAppState = new AppState(), action: IAction): IAppState => {
    let newState: IAppState = state;
    newState.NavState = NavReducer(newState.NavState, action);
    newState.NewProjectFormState = NewProjectFormReducer(newState.NewProjectFormState, action);
    newState.MessageState = MessageReducer(state.MessageState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
