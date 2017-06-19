import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as PlaybackPresenter from "./PlaybackPresenter";
import * as PlaybackActions from "./PlaybackActions";

const mapStateToProps = (state: IAppState): PlaybackPresenter.IPlaybackProps => {
    return {
        projectId: state.WorkingProjectState.Project.id,
        devices: state.ProjectState.DevicesOverviewState.DevicesWithStatuses,
        isAudioLoaded: state.ProjectState.PlaybackState.isAudioLoaded,
        isPlaying: state.ProjectState.PlaybackState.IsPlaying,
    };
};

const mapDispatchToProps = (dispatch: any): PlaybackPresenter.IPlaybackProps => {
    return {
        fetchProjectDevicePlaybackStatus: (deviceId: number, projectId: number) => dispatch(PlaybackActions.FetchProjectDevicePlaybackStatus(dispatch, deviceId, projectId)),
        loadAudio: (projectId: number) => dispatch(PlaybackActions.LoadAudio(dispatch, projectId)),
        play: (projectId: number) => dispatch(PlaybackActions.Play(dispatch, projectId)),
        stop: (projectId: number) => dispatch(PlaybackActions.Stop(dispatch, projectId)),
        unloadAudio: () => dispatch(PlaybackActions.UnloadAudio())
    };
};

const Playback = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaybackPresenter.PlaybackPresenter);

export default Playback;
