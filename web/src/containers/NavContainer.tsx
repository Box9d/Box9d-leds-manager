import { connect } from "react-redux";
import * as NavActions from "../actions/NavActions";
import * as NavPresenter from "../presentation/NavPresenter";
import { INavState } from "../state/NavState";

const mapStateToProps = (state: INavState): NavPresenter.INavProps => {
    return {
        selectedNavItem: state.SelectedNavItem,
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
