import { IAction } from "../actions/IAction";
import { DefaultAppState } from "../state/AppState";
import { IAppState } from "../state/AppState";

export const appReducer = (state: IAppState = DefaultAppState, action: IAction): IAppState => {
    let newState: IAppState = state;

    // todo: Implement reducers

    return (Object as any).assign({}, state, {}, { newState });
};
