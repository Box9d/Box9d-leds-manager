import { connect } from "react-redux";
import * as NavActions from "../actions/NavActions";
import * as NavPresenter from "../presentation/NavPresenter";
import { IAppState } from "../state/AppState";

const mapStateToProps = (state: IAppState): NavPresenter.INavProps => {
    return {
        selectedNavItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): NavPresenter.INavProps => {
    return {
        selectedNavItemOnChange: (value: string) => dispatch(NavActions.ChangeSelectedNavigationItem(value)),
    };
};

const Nav = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavPresenter.NavPresenter);

export default Nav;
