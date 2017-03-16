import { INewProjectFormProps } from "../presentation/NewProjectFormPresenter";
import { MessageType } from "../state/MessagingState";
import { NewProjectFormValidator } from "../validation/NewProjectFormValidator";
import { IAction } from "./IAction";
import * as MessageActions from "./MessageActions";

export class Actions {
    public static AddToSubmissionAttempts = "SET_SUBMISSION_ATTEMPTS";
    public static ResetSubmissionAttempts = "RESET_SUBMISSION_ATTEMPTS";
    public static ChangeNewProjectName = "CHANGE_NEW_PROJECT_NAME";
    public static FinishCreatingProject = "FINISH_CREATING_PROJECT";
}

export const ChangeNewProjectName = (name: string): IAction => {
    return {
        type: Actions.ChangeNewProjectName,
        value: name,
    };
};

export const CreateProject = (dispatch: any, props: INewProjectFormProps): IAction => {

    let validator = new NewProjectFormValidator();
    if (!validator.validateName(props.name).isValid) {
        return AddToSubmissionAttempts();
    } else {
        dispatch(ResetSubmissionAttempts());
        dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Creating project...", MessageType.Loading));

        // todo: submit to API
    }

    return {
        type: "DO_NOTHING",
    };
};

export const AddToSubmissionAttempts = (): IAction => {
    return {
        type: Actions.AddToSubmissionAttempts,
        value: null,
    };
};

export const ResetSubmissionAttempts = (): IAction => {
    return {
        type: Actions.ResetSubmissionAttempts,
        value: null,
    };
};
