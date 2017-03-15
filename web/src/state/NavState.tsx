export interface INavState {
    SelectedNavItem: string;
}

export class DefaultNavState implements INavState {
    public SelectedNavItem: string;

    constructor() {
        this.SelectedNavItem = "home";
    }
}
