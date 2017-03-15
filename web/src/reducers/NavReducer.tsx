import { IAction } from "../actions/IAction";
import { Actions } from "../actions/NavActions";
import { INavState } from "../state/NavState";

export const NavReducer = (state: INavState, action: IAction): INavState => {
    let newState: INavState = state;

    switch (action.type) {
        case Actions.ChangeSelectedNavigationItem:
            newState.SelectedNavItem = action.value;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
