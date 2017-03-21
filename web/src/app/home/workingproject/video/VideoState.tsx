import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IVideoState {
    VideoReference: ApiClient.VideoReference;
    VideoMetadata: ApiClient.VideoMetadataResponse;
}

export class VideoState implements IVideoState {
    public Loading: boolean;
    public VideoReference: ApiClient.VideoReference;
    public VideoMetadata: ApiClient.VideoMetadataResponse;

    constructor() {
        this.VideoReference = null;
        this.VideoMetadata = null;
    }
}
