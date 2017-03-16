import { connect } from "react-redux";
import * as BackgroundJobActions from "../actions/BackgroundJobActions";
import * as BackgroundJobsPresenter from "../presentation/BackgroundJobsPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
        backgroundJobs: state.BackgroundJobsState.BackgroundJobs,
        selectedMenuItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
        refreshJobs: () => dispatch(BackgroundJobActions.FetchBackgroundJobs(dispatch)),
    };
};

const BackgroundJobs = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BackgroundJobsPresenter.BackgroundJobsPresenter);

export default BackgroundJobs;
