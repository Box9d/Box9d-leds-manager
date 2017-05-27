import { IAction } from "../../../../actions/IAction";
import { Actions } from "./PlaybackActions";
import { IPlaybackState } from "./PlaybackState";

export const PlaybackReducer = (state: IPlaybackState, action: IAction): IPlaybackState => {
    let newState: IPlaybackState = state;

    switch (action.type) {
        case Actions.SetPlaying:
            newState.IsPlaying = action.value;
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};