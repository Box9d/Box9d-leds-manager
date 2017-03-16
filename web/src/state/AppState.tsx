import * as BackgroundJobsState from "./BackgroundJobsState";
import * as MessageState from "./MessagingState";
import * as NavState from "./NavState";
import * as NewProjectFormState from "./NewProjectFormState";

export interface IAppState {
    NavState?: NavState.INavState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
    NewProjectFormState?: NewProjectFormState.INewProjectFormState;
    MessageState?: MessageState.IMessagingState;
}

export class AppState implements IAppState {
    public NavState: NavState.INavState;
    public NewProjectFormState: NewProjectFormState.INewProjectFormState;
    public MessageState: MessageState.IMessagingState;
    public BackgroundJobsState: BackgroundJobsState.IBackgroundJobsState;

    constructor() {
        this.NavState = new NavState.NavState();
        this.NewProjectFormState = new NewProjectFormState.NewProjectFormState();
        this.MessageState = new MessageState.MessagingState();
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
    }
}
