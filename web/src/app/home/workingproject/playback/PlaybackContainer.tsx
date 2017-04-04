import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as PlaybackPresenter from "./PlaybackPresenter";
import * as PlaybackActions from "./PlaybackActions";

const mapStateToProps = (state: IAppState): PlaybackPresenter.IPlaybackProps => {
    return {
        devices: state.ProjectState.PlaybackState.ProjectDevices,
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): PlaybackPresenter.IPlaybackProps => {
    return {
        fetchDevices: (projectId: number) => dispatch(PlaybackActions.FetchProjectDevices(dispatch, projectId)),
    };
};

const Playback = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaybackPresenter.PlaybackPresenter);

export default Playback;
