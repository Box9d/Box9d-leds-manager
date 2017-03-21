import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as SettingsActions from "./SettingsActions";
import * as SettingsPresenter from "./SettingsPresenter";

const mapStateToProps = (state: IAppState): SettingsPresenter.ISettingsProps => {
    return {
        selectedNavItem: state.NavState.SelectedNavItem,
        ipAddressEnd: state.SettingsState.editIpEnd,
        ipAddressStart: state.SettingsState.editIpStart,
    };
};

const mapDispatchToProps = (dispatch: any): SettingsPresenter.ISettingsProps => {
    return {
        fetchSettings: () => dispatch(SettingsActions.FetchAppPreferences(dispatch)),
        saveSettings: (ipStart: string, ipFinish: string) => dispatch(SettingsActions.SaveAppPreferences(dispatch, ipStart, ipFinish)),
    };
};

const Settings = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsPresenter.SettingsPresenter);

export default Settings;
