import { connect } from "react-redux";
import * as WorkingProjectActions from "../actions/WorkingProjectActions";
import * as ProjectOverviewPresenter from "../presentation/ProjectOverviewPresenter";
import { IAppState } from "../state/AppState";

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
