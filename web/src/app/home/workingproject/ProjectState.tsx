import * as VideoState from "./video/VideoState";

export interface IProjectState {
    VideoState?: VideoState.IVideoState;
};

export class ProjectState implements IProjectState {
    public VideoState?: VideoState.IVideoState;

    constructor() {
        this.VideoState = new VideoState.VideoState();
    }
}
