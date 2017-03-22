import * as ApiClient from "../../../../api/build/ApiClient";
import { IAction } from "../../actions/IAction";
import config from "../../Config";
import * as MessageActions from "../messages/MessageActions";
import { MessageType } from "../messages/MessagingState";

export class SettingsActions {
    public static SetAppPreferences = "SET_APP_PREFERENCES";
}

export const FetchAppPreferences = (dispatch: any): IAction => {

    let apiClient = new ApiClient.AppPreferencesClient(config.apiUrl);
    apiClient.getAll().then((response: ApiClient.GlobalJsonResultOfAppPreferences) => {
        if (response.successful) {
            dispatch(SetAppPreferences(response.result));
        }
    });

    return {
        type: "DO_NOTHING",
        value: null,
    };
};

export const SaveAppPreferences = (dispatch: any, startIp: string, finishIp: string): IAction => {

    let appPrefs = new ApiClient.AppPreferences();
    appPrefs.deviceSearchStartIp = startIp;
    appPrefs.deviceSearchEndIp = finishIp;

    let apiClient = new ApiClient.AppPreferencesClient(config.apiUrl);
    apiClient.updatePreferences(appPrefs).then((response: ApiClient.GlobalJsonResultOfAppPreferences) => {
        if (response.successful) {
            dispatch(SetAppPreferences(response.result));
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Save successful", MessageType.Info));
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not save: " + response.errorMessage, MessageType.Error));
        }
    });

    return {
        type: "DO_NOTHING",
        value: null,
    };
};

export const SetAppPreferences = (appPrefs: ApiClient.AppPreferences) => {
    return {
        type: SettingsActions.SetAppPreferences,
        value: appPrefs,
    };
};