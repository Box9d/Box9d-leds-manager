import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as BackgroundJobActions from "./BackgroundJobsActions";
import * as BackgroundJobsStatusPresenter from "./BackgroundJobsStatusPresenter";

const mapStateToProps = (state: IAppState): BackgroundJobsStatusPresenter.IBackgroundJobsStatusProps => {
    return {
        backgroundJobs: state.ProjectState.BackgroundJobsState.Jobs,
        projectId: state.WorkingProjectState.Project.id,
    };
};

const mapDispatchToProps = (dispatch: any): BackgroundJobsStatusPresenter.IBackgroundJobsStatusProps => {
    return {
        startPollingBackgroundJobs: (projectId: number) => dispatch(BackgroundJobActions.StartPollingBackgroundJobs(dispatch, projectId)),
        stopPollingBackgroundJobs: () => dispatch(BackgroundJobActions.StopPollingBackgroundJobs(dispatch)),
    };
};

const BackgroundJobsStatus = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BackgroundJobsStatusPresenter.BackgroundJobsStatusPresenter);

export default BackgroundJobsStatus;
