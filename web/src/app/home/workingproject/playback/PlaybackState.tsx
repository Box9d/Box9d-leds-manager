import * as ApiClient from "../../../../../../api/build/ApiClient";

export interface IPlaybackState {
    IsPlaying: boolean;
}

export class PlaybackState implements IPlaybackState {
    IsPlaying: boolean;

    constructor() {
        this.IsPlaying = false;
    }
}
