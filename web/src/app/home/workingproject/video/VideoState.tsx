import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IVideoState {
    ShouldFetchVideo: boolean;
    VideoReference: ApiClient.VideoReference;
    VideoMetadata: ApiClient.VideoMetadataResponse;
}

export class VideoState implements IVideoState {
    public VideoReference: ApiClient.VideoReference;
    public ShouldFetchVideo: boolean;
    public VideoMetadata: ApiClient.VideoMetadataResponse;

    constructor() {
        this.VideoReference = null;
        this.VideoMetadata = null;
        this.ShouldFetchVideo = true;
    }
}
