import { connect } from "react-redux";
import { IAppState } from "../../../AppState";
import * as SelectVideoPresenter from "./SelectVideoPresenter";
import * as VideoActions from "./VideoActions";

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
        onFileSelect: (fileName: string, fileUploadForm: any, projectId: number) => dispatch(VideoActions.SetProjectVideo(dispatch, projectId, fileUploadForm, fileName)),
    };
};

const SelectVideo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectVideoPresenter.SelectVideoPresenter);

export default SelectVideo;
