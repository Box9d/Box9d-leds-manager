import * as ApiClient from "../../../api/build/ApiClient";
import config from "../Config";
import { MessageType } from "../state/MessagingState";
import { IAction } from "./IAction";
import * as MessageActions from "./MessageActions";
import * as VideoActions from "./VideoActions";

export class Actions {
    public static SetWorkingProject = "SET_WORKING_PROJECT";
    public static ClearWorkingProject = "CLEAR_WORKING_PROJECT";
    public static HasCheckedProjectIsSet = "HAS_CHECKED_PROJECT_IS_SET";
}

export const GetWorkingProject = (dispatch: any): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Loading...", MessageType.Loading));

    let apiClient = new ApiClient.ProjectsClient(config.apiUrl);
    apiClient.hasWorkingProject().then((response: ApiClient.GlobalJsonResultOfBoolean) => {
        if (response.successful) {
            if (response.result) {
                apiClient.getWorkingProject().then((getWorkingProjectResponse: ApiClient.GlobalJsonResultOfProject) => {
                    if (getWorkingProjectResponse.successful) {
                        dispatch(MessageActions.ClearMessage());
                        dispatch({type: Actions.HasCheckedProjectIsSet});
                        dispatch({type: Actions.SetWorkingProject, value: getWorkingProjectResponse.result});
                        return {
                            type: "DO_NOTHING",
                        };
                    } else {
                        dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not get current working project " + response.errorMessage, MessageType.Error));
                    }
                });
            } else {
                dispatch(MessageActions.ClearMessage());
                dispatch({ type: Actions.HasCheckedProjectIsSet});
                return {
                    type: "DO_NOTHING",
                };
            }
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not determine whether there is a current working project: " + response.errorMessage, MessageType.Error));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const SetWorkingProject = (dispatch: any, projectId: number): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Setting working project...", MessageType.Loading));

    let apiClient = new ApiClient.ProjectsClient(config.apiUrl);
    apiClient.setWorkingProject(projectId).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (response.successful) {
            apiClient.get(projectId).then((getProjectResponse: ApiClient.GlobalJsonResultOfProject) => {
                if (getProjectResponse.successful) {
                    dispatch(MessageActions.ClearMessage());
                    dispatch({type: Actions.SetWorkingProject, value: getProjectResponse.result});
                    return {
                        type: "DO_NOTHING",
                    };
                } else {
                    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not set the working project: " + response.errorMessage, MessageType.Error));
                    return {
                        type: "DO_NOTHING",
                    };
                }
            });
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not set the working project: " + response.errorMessage, MessageType.Error));
            return {
                type: "DO_NOTHING",
            };
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const ClearWorkingProject = (dispatch: any): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Clearing working project...", MessageType.Loading));

    let apiClient = new ApiClient.ProjectsClient(config.apiUrl);
    apiClient.clearWorkingProject().then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (response.successful) {
            dispatch(MessageActions.ClearMessage());
            dispatch({type: Actions.ClearWorkingProject});
            dispatch({type: VideoActions.Actions.SetShouldFetchVideo, value: true});
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not clear the working project: " + response.errorMessage, MessageType.Error));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};
