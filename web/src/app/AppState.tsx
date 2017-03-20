import * as BackgroundJobsState from "./backgroundjobs/BackgroundJobsState";
import * as OpenProjectState from "./home/existingproject/OpenProjectState";
import * as NewProjectFormState from "./home/newproject/NewProjectFormState";
import * as ProjectState from "./home/workingproject/ProjectState";
import * as WorkingProjectState from "./home/workingproject/WorkingProjectState";
import * as MessageState from "./messages/MessagingState";
import * as NavState from "./nav/NavState";
import * as SettingsState from "./settings/SettingsState";

export interface IAppState {
    NavState?: NavState.INavState;
    BackgroundJobsState?: BackgroundJobsState.IBackgroundJobsState;
    OpenProjectState?: OpenProjectState.IOpenProjectState;
    NewProjectFormState?: NewProjectFormState.INewProjectFormState;
    MessageState?: MessageState.IMessagingState;
    WorkingProjectState?: WorkingProjectState.IWorkingProjectState;
    ProjectState?: ProjectState.IProjectState;
    SettingsState?: SettingsState.ISettingsState;
}

export class AppState implements IAppState {
    public NavState: NavState.INavState;
    public NewProjectFormState: NewProjectFormState.INewProjectFormState;
    public MessageState: MessageState.IMessagingState;
    public BackgroundJobsState: BackgroundJobsState.IBackgroundJobsState;
    public OpenProjectState: OpenProjectState.IOpenProjectState;
    public WorkingProjectState: WorkingProjectState.WorkingProjectState;
    public ProjectState: ProjectState.ProjectState;
    public SettingsState: SettingsState.SettingsState;

    constructor() {
        this.NavState = new NavState.NavState();
        this.NewProjectFormState = new NewProjectFormState.NewProjectFormState();
        this.MessageState = new MessageState.MessagingState();
        this.BackgroundJobsState = new BackgroundJobsState.BackgroundJobsState();
        this.OpenProjectState = new OpenProjectState.OpenProjectState();
        this.WorkingProjectState = new WorkingProjectState.WorkingProjectState();
        this.ProjectState = new ProjectState.ProjectState();
        this.SettingsState = new SettingsState.SettingsState();
    }
}
