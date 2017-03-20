import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
import * as VideoActions from "./VideoActions";
import * as VideoConfigurationStatusPresenter from "./VideoConfigurationStatusPresenter";

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
