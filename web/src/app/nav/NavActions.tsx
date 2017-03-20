import { IAction } from "../../actions/IAction";

export class Actions {
    public static ChangeSelectedNavigationItem = "CHANGE_SELECTED_NAVIGATION_ITEM";
}

export const ChangeSelectedNavigationItem = (selectedNavItem: string): IAction => {
    return {
        type: Actions.ChangeSelectedNavigationItem,
        value: selectedNavItem,
    };
};
