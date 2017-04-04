import { connect } from "react-redux";
import { IAppState } from "../../../../AppState";
import * as PlaybackDeviceStatusPresenter from "./PlaybackDeviceStatusPresenter";
import * as PlaybackDeviceStatusActions from "./PlaybackDeviceStatusActions";

const mapStateToProps = (state: IAppState, ownProps: PlaybackDeviceStatusPresenter.IPlaybackDeviceStatusProps): PlaybackDeviceStatusPresenter.IPlaybackDeviceStatusProps => {
    return {
        projectDeviceId: ownProps.projectDeviceId,
    };
};

const mapDispatchToProps = (dispatch: any): PlaybackDeviceStatusPresenter.IPlaybackDeviceStatusProps => {
    return {
        fetchProjectDevicePlaybackStatus: (projectDeviceId: number) => dispatch(PlaybackDeviceStatusActions.FetchProjectDevicePlaybackStatus(dispatch, projectDeviceId)),
    };
};

const PlaybackDeviceStatus = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaybackDeviceStatusPresenter.PlaybackDeviceStatusPresenter);

export default PlaybackDeviceStatus;