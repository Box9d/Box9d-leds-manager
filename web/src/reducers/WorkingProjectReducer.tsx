import { IAction } from "../actions/IAction";
import { Actions } from "../actions/WorkingProjectActions";
import { IWorkingProjectState } from "../state/WorkingProjectState";

export const WorkingProjectReducer = (state: IWorkingProjectState, action: IAction): IWorkingProjectState => {
    let newState: IWorkingProjectState = state;

    switch (action.type) {
        case Actions.SetWorkingProject:
            newState.IsSet = true;
            newState.ProjectId = action.value;
            break;
        case Actions.ClearWorkingProject:
            newState.ProjectId = 0;
            newState.IsSet = false;
            break;
        case Actions.HasCheckedProjectIsSet:
            newState.HasCheckedIsSet = true;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
