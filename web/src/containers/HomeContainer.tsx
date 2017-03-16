import { connect } from "react-redux";
import * as NavActions from "../actions/NavActions";
import * as HomePresenter from "../presentation/HomePresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): HomePresenter.IHomeProps => {
    return {
        selectedNavItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): HomePresenter.IHomeProps => {
    return {
    };
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePresenter.HomePresenter);

export default Home;
