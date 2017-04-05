import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as PlaybackPresenter from "./PlaybackPresenter";
import * as PlaybackActions from "./PlaybackActions";

const mapStateToProps = (state: IAppState): PlaybackPresenter.IPlaybackProps => {
    return {
        devices: state.ProjectState.DevicesOverviewState.DevicesWithStatuses,
    };
};

const mapDispatchToProps = (dispatch: any): PlaybackPresenter.IPlaybackProps => {
    return {
        fetchProjectDevicePlaybackStatus: (deviceId: number) => dispatch(PlaybackActions.FetchProjectDevicePlaybackStatus(dispatch, deviceId)),
    };
};

const Playback = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaybackPresenter.PlaybackPresenter);

export default Playback;
