import * as NavState from "./NavState";

export interface IAppState {
    NavState?: NavState.INavState;
}

export class DefaultAppState implements IAppState {
    public NavState = new NavState.DefaultNavState();
}
