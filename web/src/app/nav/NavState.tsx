export interface INavState {
    SelectedNavItem: string;
}

export class NavState implements INavState {
    public SelectedNavItem: string;

    constructor() {
        this.SelectedNavItem = "home";
    }
}
