import { connect } from "react-redux";
import * as VideoActions from "../actions/VideoActions";
import * as SelectVideoPresenter from "../presentation/SelectVideoPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): SelectVideoPresenter.ISelectVideoProps => {
    return {
        hasCheckedVideoState: !state.ProjectState.VideoState.ShouldFetchVideo,
        hasVideo: state.ProjectState.VideoState.VideoReference != null && state.ProjectState.VideoState.VideoMetadata != null,
        projectId: state.WorkingProjectState.Project.id,
        videoFilePath: state.ProjectState.VideoState.VideoReference != null
            ? state.ProjectState.VideoState.VideoReference.filePath
            : "",
        videoMetadata: state.ProjectState.VideoState.VideoMetadata,
    };
};

const mapDispatchToProps = (dispatch: any): SelectVideoPresenter.ISelectVideoProps => {
    return {
        fetchVideo: (projectId: number) => dispatch(VideoActions.FetchProjectVideo(dispatch, projectId)),
        onFileSelect: (projectId: number, filePath: string) => dispatch(VideoActions.SetProjectVideo(dispatch, projectId, filePath)),
    };
};

const SelectVideo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectVideoPresenter.SelectVideoPresenter);

export default SelectVideo;
