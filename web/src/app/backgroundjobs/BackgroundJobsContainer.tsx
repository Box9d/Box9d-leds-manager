import { connect } from "react-redux";
import { IAppState } from "../AppState";
import { FetchBackgroundJobs } from "../backgroundjobs/BackgroundJobActions";
import * as BackgroundJobsPresenter from "./BackgroundJobsPresenter";

const mapStateToProps = (state: IAppState): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
        backgroundJobs: state.BackgroundJobsState.BackgroundJobs,
        selectedMenuItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
        refreshJobs: () => dispatch(FetchBackgroundJobs(dispatch)),
    };
};

const BackgroundJobs = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BackgroundJobsPresenter.BackgroundJobsPresenter);

export default BackgroundJobs;
