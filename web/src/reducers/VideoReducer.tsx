import { IAction } from "../actions/IAction";
import { Actions } from "../actions/VideoActions";
import { IVideoState } from "../state/VideoState";

export const VideoReducer = (state: IVideoState, action: IAction): IVideoState => {
    let newState: IVideoState = state;

    switch (action.type) {
        case Actions.SetShouldFetchVideo:
            newState.ShouldFetchVideo = action.value;
            break;
        case Actions.SetVideoMetadata:
            newState.VideoMetadata = action.value;
            break;
        case Actions.SetVideoReference:
            newState.VideoReference = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
