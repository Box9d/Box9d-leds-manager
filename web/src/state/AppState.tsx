import * as BackgroundJobsState from "./BackgroundJobsState";
import * as MessageState from "./MessagingState";
import * as NavState from "./NavState";
import * as NewProjectFormState from "./NewProjectFormState";
import * as OpenProjectState from "./OpenProjectState";
import * as ProjectState from "./ProjectState";
import * as WorkingProjectState from "./WorkingProjectState";

export interface IAppState {
    NavState?: NavState.INavState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
    OpenProjectState?: OpenProjectState.IOpenProjectState;
    NewProjectFormState?: NewProjectFormState.INewProjectFormState;
    MessageState?: MessageState.IMessagingState;
    WorkingProjectState?: WorkingProjectState.IWorkingProjectState;
    ProjectState?: ProjectState.IProjectState;
}

export class AppState implements IAppState {
    public NavState: NavState.INavState;
    public NewProjectFormState: NewProjectFormState.INewProjectFormState;
    public MessageState: MessageState.IMessagingState;
    public BackgroundJobsState: BackgroundJobsState.IBackgroundJobsState;
    public OpenProjectState: OpenProjectState.IOpenProjectState;
    public WorkingProjectState: WorkingProjectState.WorkingProjectState;
    public ProjectState: ProjectState.ProjectState;

    constructor() {
        this.NavState = new NavState.NavState();
        this.NewProjectFormState = new NewProjectFormState.NewProjectFormState();
        this.MessageState = new MessageState.MessagingState();
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
        this.OpenProjectState = new OpenProjectState.OpenProjectState();
        this.WorkingProjectState = new WorkingProjectState.WorkingProjectState();
        this.ProjectState = new ProjectState.ProjectState();
    }
}
