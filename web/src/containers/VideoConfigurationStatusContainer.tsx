import { connect } from "react-redux";
import * as VideoActions from "../actions/VideoActions";
import * as VideoConfigurationStatusPresenter from "../presentation/VideoConfigurationStatusPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): VideoConfigurationStatusPresenter.IVideoConfigurationStatusProps => {
    return {
        hasCheckedVideoConfigurationStatus: !state.ProjectState.VideoState.ShouldFetchVideo,
        projectId: state.WorkingProjectState.Project.id,
        videoIsConfigured: state.ProjectState.VideoState.VideoReference != null,
    };
};

const mapDispatchToProps = (dispatch: any): VideoConfigurationStatusPresenter.IVideoConfigurationStatusProps => {
    return {
        checkVideoConfigurationStatus: (projectId: number) => dispatch(VideoActions.FetchProjectVideo(dispatch, projectId)),
    };
};

const VideoConfigurationStatus = connect(
    mapStateToProps,
    mapDispatchToProps,
)(VideoConfigurationStatusPresenter.VideoConfigurationStatusPresenter);

export default VideoConfigurationStatus;
