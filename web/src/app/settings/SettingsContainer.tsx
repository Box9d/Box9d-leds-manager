import * as ApiClient from "../../../../api/build/ApiClient";
import { connect } from "react-redux";
import { IAppState } from "../AppState";
import * as SettingsActions from "./SettingsActions";
import * as SettingsPresenter from "./SettingsPresenter";

const mapStateToProps = (state: IAppState): SettingsPresenter.ISettingsProps => {
    return {
        selectedNavItem: state.NavState.SelectedNavItem,
        appPreferences: state.SettingsState.appPreferences,
    };
};

const mapDispatchToProps = (dispatch: any): SettingsPresenter.ISettingsProps => {
    return {
        fetchSettings: () => dispatch(SettingsActions.FetchAppPreferences(dispatch)),
        saveSettings: (ipStart: string, ipFinish: string, pingTimeout: number, playbackBuffer: number) =>
            dispatch(SettingsActions.SaveAppPreferences(dispatch, ipStart, ipFinish, pingTimeout, playbackBuffer)),
    };
};

const Settings = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SettingsPresenter.SettingsPresenter);

export default Settings;
