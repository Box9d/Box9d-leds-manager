import * as BackgroundJobsState from "./backgroundjobs/BackgroundJobsState";
import * as DevicesOverviewState from "./devices/DevicesOverviewState";
import * as VideoState from "./video/VideoState";
import * as PlaybackState from "./playback/PlaybackState";

export interface IProjectState {
    VideoState?: VideoState.IVideoState;
    DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
    PlaybackState?: PlaybackState.IPlaybackState;
};

export class ProjectState implements IProjectState {
    public VideoState?: VideoState.IVideoState;
    public DevicesOverviewState?: DevicesOverviewState.IDevicesOverviewState;
    public BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
    public PlaybackState?: PlaybackState.IPlaybackState;

    constructor() {
        this.VideoState = new VideoState.VideoState();
        this.DevicesOverviewState = new DevicesOverviewState.DevicesOverviewState();
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
        this.PlaybackState = new PlaybackState.PlaybackState();
    }
}
