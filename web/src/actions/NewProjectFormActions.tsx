import * as ApiClient from "../../../api/build/ApiClient";
import config from "../Config";
import { INewProjectFormProps } from "../presentation/NewProjectFormPresenter";
import { MessageType } from "../state/MessagingState";
import { NewProjectFormValidator } from "../validation/NewProjectFormValidator";
import { IAction } from "./IAction";
import * as MessageActions from "./MessageActions";
import * as WorkingProjectActions from "./WorkingProjectActions";

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

        let project = new ApiClient.Project();
        project.name = props.name;

        let apiClient = new ApiClient.ProjectsClient(config.apiUrl);
        apiClient.create(project).then((response: ApiClient.GlobalJsonResultOfProject) => {
            if (response.successful) {
                dispatch(ChangeNewProjectName(""));
                dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Project creation successful!", MessageType.Info));
                dispatch(WorkingProjectActions.SetWorkingProject(dispatch, response.result.id));
            } else {
                dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Project creation unsuccessful", MessageType.Error));
            }
        });
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
