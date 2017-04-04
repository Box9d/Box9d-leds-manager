import * as ApiClient from "../../../../../../../api/build/ApiClient";

export interface IPlaybackDeviceStatusState {
    ProjectDevicePlaybackStatus: ApiClient.ProjectDevicePlaybackStatus;
};

export class PlaybackDeviceStatusState implements IPlaybackDeviceStatusState {
    public ProjectDevicePlaybackStatus: ApiClient.ProjectDevicePlaybackStatus;

    constructor() {
        this.ProjectDevicePlaybackStatus = ApiClient.ProjectDevicePlaybackStatus.NotOnline;
    }
}
