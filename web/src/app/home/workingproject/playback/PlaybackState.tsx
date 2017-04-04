import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IPlaybackState {
    ProjectDevices: ApiClient.Device[];
};

export class PlaybackState implements IPlaybackState {
    public ProjectDevices: ApiClient.Device[];
    
    constructor() {
        this.ProjectDevices = new Array<ApiClient.Device>();
    }
}
