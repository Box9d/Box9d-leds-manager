import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IPlaybackState {
    IsPlaying: boolean;
    isAudioLoaded: boolean;
}

export class PlaybackState implements IPlaybackState {
    IsPlaying: boolean;
    isAudioLoaded: boolean;

    constructor() {
        this.IsPlaying = false;
        this.isAudioLoaded = false;
    }
}
