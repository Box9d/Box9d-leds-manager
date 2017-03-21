import { IAction } from "../../actions/IAction";
import { SettingsActions } from "./SettingsActions";
import { ISettingsState } from "./SettingsState";

export const SettingsReducer = (state: ISettingsState, action: IAction): ISettingsState => {
    let newState: ISettingsState = state;

    switch (action.type) {
        case SettingsActions.SetAppPreferences:
            newState.editIpStart = action.value.deviceSearchStartIp;
            newState.editIpEnd = action.value.deviceSearchEndIp;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
