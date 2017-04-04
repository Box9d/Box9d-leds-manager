import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./PlaybackDeviceStatusActions";
import { IPlaybackDeviceStatusState } from "./PlaybackDeviceStatusState";

export const PlaybackDeviceStatusReducer = (state: IPlaybackDeviceStatusState, action: IAction): IPlaybackDeviceStatusState => {
    let newState: IPlaybackDeviceStatusState = state;

    switch (action.type) {
        case Actions.SetProjectDevicePlaybackStatus:
            newState.ProjectDevicePlaybackStatus = action.value;
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
