import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as PlaybackPresenter from "./PlaybackPresenter";
import * as PlaybackActions from "./PlaybackActions";

const mapStateToProps = (state: IAppState): PlaybackPresenter.IPlaybackProps => {
    return {
        projectId: state.WorkingProjectState.Project.id,
        devices: state.ProjectState.DevicesOverviewState.DevicesWithStatuses,
        isPlaying: state.ProjectState.PlaybackState.IsPlaying,
    };
};

const mapDispatchToProps = (dispatch: any): PlaybackPresenter.IPlaybackProps => {
    return {
        fetchProjectDevicePlaybackStatus: (deviceId: number) => dispatch(PlaybackActions.FetchProjectDevicePlaybackStatus(dispatch, deviceId)),
        play: (projectId: number) => dispatch(PlaybackActions.Play(dispatch, projectId)),
        stop: (projectId: number) => dispatch(PlaybackActions.Stop(dispatch, projectId)),
    };
};

const Playback = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaybackPresenter.PlaybackPresenter);

export default Playback;
