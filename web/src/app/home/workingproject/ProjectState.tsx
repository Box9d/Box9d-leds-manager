import * as DevicesOverviewState from "./devices/DevicesOverviewState";
import * as VideoState from "./video/VideoState";

export interface IProjectState {
    VideoState?: VideoState.IVideoState;
    DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;
};

export class ProjectState implements IProjectState {
    public VideoState?: VideoState.IVideoState;
    public DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;

    constructor() {
        this.VideoState = new VideoState.VideoState();
        this.DevicesOverviewState = new DevicesOverviewState.DevicesOverviewState();
    }
}
