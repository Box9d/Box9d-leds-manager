import { IAction } from "../actions/IAction";
import { IProjectState } from "../state/ProjectState";
import { VideoReducer } from "./VideoReducer";

export const ProjectReducer = (state: IProjectState, action: IAction): IProjectState => {
    let newState: IProjectState = state;
    newState.VideoState = VideoReducer(newState.VideoState, action);

    switch (action.type) {
        // todo:

        default: return state;
    }

    // return (Object as any).assign({}, state, {}, { newState });
};
