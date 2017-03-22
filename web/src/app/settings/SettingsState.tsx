import * as ApiClient from "../../../../api/build/ApiClient";

export interface ISettingsState {
    appPreferences?: ApiClient.AppPreferences;
}

export class SettingsState implements ISettingsState {
    appPreferences: ApiClient.AppPreferences;

    constructor() {
        this.appPreferences = new ApiClient.AppPreferences();
    }
}