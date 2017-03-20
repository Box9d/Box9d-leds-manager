import { connect } from "react-redux";
import * as SettingsPresenter from "../presentation/SettingsPresenter";
import { IAppState } from "../state/AppState";

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
