import * as BackgroundJobsState from "./backgroundjobs/BackgroundJobsState";
import * as DevicesOverviewState from "./devices/DevicesOverviewState";
import * as VideoState from "./video/VideoState";

export interface IProjectState {
    VideoState?: VideoState.IVideoState;
    DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
};

export class ProjectState implements IProjectState {
    public VideoState?: VideoState.IVideoState;
    public DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;
    public BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;

    constructor() {
        this.VideoState = new VideoState.VideoState();
        this.DevicesOverviewState = new DevicesOverviewState.DevicesOverviewState();
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
    }
}
