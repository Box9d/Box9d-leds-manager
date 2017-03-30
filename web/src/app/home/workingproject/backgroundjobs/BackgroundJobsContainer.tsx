import { connect } from "react-redux";
import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAppState } from "../../../AppState";
import * as BackgroundJobsPresenter from "./BackgroundJobsPresenter";

const mapStateToProps = (state: IAppState): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
        // todo:
        backgroundJobs: new Array<ApiClient.BackgroundJob>(),
    };
};

const mapDispatchToProps = (dispatch: any): BackgroundJobsPresenter.IBackgroundJobsProps => {
    return {
    };
};

const BackgroundJobs = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BackgroundJobsPresenter.BackgroundJobsPresenter);

export default BackgroundJobs;
