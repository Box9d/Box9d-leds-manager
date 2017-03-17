import { connect } from "react-redux";
import * as WorkingProjectActions from "../actions/WorkingProjectActions";
import * as HomePresenter from "../presentation/HomePresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): HomePresenter.IHomeProps => {
    return {
        hasCheckedForWorkingProject: state.WorkingProjectState.HasCheckedIsSet,
        hasWorkingProject: state.WorkingProjectState.HasCheckedIsSet && state.WorkingProjectState.IsSet,
        selectedNavItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): HomePresenter.IHomeProps => {
    return {
        checkForWorkingProject: () => dispatch(WorkingProjectActions.GetWorkingProject(dispatch)),
    };
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePresenter.HomePresenter);

export default Home;
