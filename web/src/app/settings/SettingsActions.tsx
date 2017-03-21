import * as ApiClient from "../../../../api/build/ApiClient";
import { IAction } from "../../actions/IAction";
import config from "../../Config";

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

export const SetAppPreferences = (appPrefs: ApiClient.AppPreferences) => {
    return {
        type: SettingsActions.SetAppPreferences,
        value: appPrefs,
    };
};