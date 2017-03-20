import { connect } from "react-redux";
import { IAppState } from "../../AppState";
import * as WorkingProjectActions from "../workingproject/WorkingProjectActions";
import * as ProjectOverviewPresenter from "./ProjectOverviewPresenter";

const mapStateToProps = (state: IAppState): ProjectOverviewPresenter.IProjectOverviewProps => {
    return {
        project: state.WorkingProjectState.Project,
    };
};

const mapDispatchToProps = (dispatch: any): ProjectOverviewPresenter.IProjectOverviewProps => {
    return {
        closeProject: () => dispatch(WorkingProjectActions.ClearWorkingProject(dispatch)),
    };
};

const ProjectOverview = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectOverviewPresenter.ProjectOverviewPresenter);

export default ProjectOverview;
