import * as ApiClient from "../../../api/build/ApiClient";
import config from "../Config";
import { MessageType } from "../state/MessagingState";
import { IAction } from "./IAction";
import * as MessageActions from "./MessageActions";

export class Actions {
    public static OpenModal = "OPEN_OPEN_PROJECT_MODAL";
    public static CloseModal = "CLOSE_OPEN_PROJECT_MODAL";
    public static SetProjects = "SET_PROJECTS";
}

export const OpenModal = (): IAction => {
    return {
        type: Actions.OpenModal,
        value: name,
    };
};

export const CloseModal = (): IAction => {
    return {
        type: Actions.CloseModal,
        value: name,
    };
};

export const SetProjects = (projects: ApiClient.Project[]): IAction => {
    return {
        type: Actions.SetProjects,
        value: projects,
    };
};

export const FetchProjects = (dispatch: any): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Loading projects...", MessageType.Loading));

    // todo: Load projects from API
    let apiClient = new ApiClient.ProjectsClient(config.apiUrl);
    apiClient.getAll().then((response: ApiClient.GlobalJsonResultOfIEnumerableOfProject) => {
        if (response.successful) {
            dispatch(MessageActions.ClearMessage());
            dispatch(SetProjects(response.result));
            dispatch(OpenModal());
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Project creation unsuccessful", MessageType.Error));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};
