import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

export class Actions {
    public static SetVideoMetadata: string = "SET_VIDEO_METADATA";
    public static SetVideoReference: string = "SET_VIDEO_REFERENCE";
}

export const FetchProjectVideo = (dispatch: any, projectId: number): IAction => {

    let apiClient = new ApiClient.VideoClient(config.apiUrl);
    apiClient.getProjectVideo(projectId).then((response: ApiClient.GlobalJsonResultOfVideoReference) => {
        if (response.successful) {
            dispatch({ type: Actions.SetVideoReference, value: response.result});

            if (response.result != null) {
                apiClient.getProjectVideoMetadata(projectId).then((videoMetadataResponse: ApiClient.GlobalJsonResultOfVideoMetadataResponse) => {
                    if (videoMetadataResponse.successful) {
                        dispatch({ type: Actions.SetVideoMetadata, value: videoMetadataResponse.result});
                    } else {
                        dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not fetch video metadata: " + videoMetadataResponse.errorMessage, MessageType.Error));
                    }
                });
            }
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not fetch video reference: " + response.errorMessage, MessageType.Error));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const SetProjectVideo = (dispatch: any, projectId: number, fileUploadForm: any, fileName: string): IAction => {

    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Uploading video...", MessageType.Loading));

    let apiClient = new ApiClient.VideoClient(config.apiUrl);
    apiClient.preUploadVideo(fileName).then((preUploadResponse: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!preUploadResponse.successful) {
                dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not set start video upload: " + preUploadResponse.errorMessage, MessageType.Error));
        } else {
            fileUploadForm.submit();
            apiClient.finishVideoUpload().then((finishUploadResponse: ApiClient.GlobalJsonResultOfVideoReference) => {
                if (!finishUploadResponse.successful) {
                    dispatch(MessageActions.SetMessageAndMessageType(dispatch, "An unknown error occurred whilst upload the video", MessageType.Error));
                } else {
                    apiClient.addMostRecentVideoUploadToProject(projectId, finishUploadResponse.result.id).then((response: ApiClient.GlobalJsonResultOfProjectVideo) => {
                        if (!response.successful) {
                            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not set project video reference: " + response.errorMessage, MessageType.Error));
                        } else {
                            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Video upload successful", MessageType.Info));
                            dispatch(FetchProjectVideo(dispatch, projectId));
                        }
                    });
                }
            });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};
