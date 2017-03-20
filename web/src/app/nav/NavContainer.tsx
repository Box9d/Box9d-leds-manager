import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as NavActions from "./NavActions";
import * as NavPresenter from "./NavPresenter";

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
