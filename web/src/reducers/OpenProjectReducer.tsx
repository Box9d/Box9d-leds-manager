import { IAction } from "../actions/IAction";
import { Actions } from "../actions/OpenProjectActions";
import { IOpenProjectState } from "../state/OpenProjectState";

export const OpenProjectReducer = (state: IOpenProjectState, action: IAction): IOpenProjectState => {
    let newState: IOpenProjectState = state;

    switch (action.type) {
        case Actions.OpenModal:
            newState.ModalIsOpen = true;
            break;
        case Actions.CloseModal:
            newState.ModalIsOpen = false;
            break;
        case Actions.SetProjects:
            newState.Projects = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
