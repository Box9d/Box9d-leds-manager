import * as VideoState from "./VideoState";

export interface IProjectState {
    VideoSelectionState?: VideoState.IVideoState;
};

export class ProjectState implements IProjectState {
    public VideoSelectionState?: VideoState.IVideoState;

    constructor() {
        this.VideoSelectionState = new VideoState.VideoState();
    }
}
