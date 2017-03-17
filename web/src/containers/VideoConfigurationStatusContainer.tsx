import { connect } from "react-redux";
import * as WorkingProjectActions from "../actions/WorkingProjectActions";
import * as VideoConfigurationStatusPresenter from "../presentation/VideoConfigurationStatusPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): VideoConfigurationStatusPresenter.IVideoConfigurationStatusProps => {
    return {
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): VideoConfigurationStatusPresenter.IVideoConfigurationStatusProps => {
    return {
    };
};

const VideoConfigurationStatus = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoConfigurationStatusPresenter.VideoConfigurationStatusPresenter);

export default VideoConfigurationStatus;
