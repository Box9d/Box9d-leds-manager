import { IAction } from "../../../actions/IAction";
import { DevicesOverviewReducer } from "./devices/DevicesOverviewReducer";
import { IProjectState } from "./ProjectState";
import { VideoReducer } from "./video/VideoReducer";

export const ProjectReducer = (state: IProjectState, action: IAction): IProjectState => {
    let newState: IProjectState = state;
    newState.VideoState = VideoReducer(newState.VideoState, action);
    newState.DevicesOverviewState = DevicesOverviewReducer(newState.DevicesOverviewState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
