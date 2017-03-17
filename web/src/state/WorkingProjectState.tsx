export interface IWorkingProjectState {
    HasCheckedIsSet: boolean;
    IsSet: boolean;
    ProjectId: number;
}

export class WorkingProjectState implements IWorkingProjectState {
    public HasCheckedIsSet: boolean;
    public IsSet: boolean;
    public ProjectId: number;

    constructor() {
        this.HasCheckedIsSet = false;
        this.IsSet = false;
        this.ProjectId = 0;
    }
}
