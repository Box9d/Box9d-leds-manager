import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IPlaybackState {
    ProjectDevices: ApiClient.Device[];
    IsLoaded: boolean;
};

export class PlaybackState implements IPlaybackState {
    public ProjectDevices: ApiClient.Device[];
    public IsLoaded: boolean;

    constructor() {
        this.ProjectDevices = new Array<ApiClient.Device>();
        this.IsLoaded = false;
    }
}
