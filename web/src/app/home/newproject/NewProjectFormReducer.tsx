import { IAction } from "../../../actions/IAction";
import { Actions } from "./NewProjectFormActions";
import { INewProjectFormState } from "./NewProjectFormState";

export const NewProjectFormReducer = (state: INewProjectFormState, action: IAction): INewProjectFormState => {
    let newState: INewProjectFormState = state;

    switch (action.type) {
        case Actions.ChangeNewProjectName:
            newState.Name = action.value;
            break;
        case Actions.AddToSubmissionAttempts:
            newState.SubmitAttempts = state.SubmitAttempts + 1;
            break;
        case Actions.ResetSubmissionAttempts:
            newState.SubmitAttempts = 0;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
