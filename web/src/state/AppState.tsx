import * as BackgroundJobsState from "./BackgroundJobsState";
import * as NavState from "./NavState";

export interface IAppState {
    NavState?: NavState.INavState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
}

export class DefaultAppState implements IAppState {
    public NavState = new NavState.DefaultNavState();
    public BackgroundJobsState: BackgroundJobsState.IBackgroundJobsState;

    constructor() {
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
    }
}
