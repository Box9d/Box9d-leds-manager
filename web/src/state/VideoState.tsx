import * as ApiClient from "../../../api/build/ApiClient";

export interface IVideoState {
    Video: ApiClient.VideoReference;
}

export class VideoState implements IVideoState {
    public Video: ApiClient.VideoReference;

    constructor() {
        this.Video = null;
    }
}
