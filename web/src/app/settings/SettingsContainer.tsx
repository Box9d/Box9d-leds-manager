import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as SettingsPresenter from "./SettingsPresenter";

const mapStateToProps = (state: IAppState): SettingsPresenter.ISettingsProps => {
    return {
        selectedNavItem: state.NavState.SelectedNavItem,
    };
};

const mapDispatchToProps = (dispatch: any): SettingsPresenter.ISettingsProps => {
    return {
    };
};

const Settings = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsPresenter.SettingsPresenter);

export default Settings;
