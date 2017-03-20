import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as HomePresenter from "./HomePresenter";
import * as WorkingProjectActions from "./workingproject/WorkingProjectActions";

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
