import * as ApiClient from "../../../api/build/ApiClient";

export interface IWorkingProjectState {
    HasCheckedIsSet: boolean;
    IsSet: boolean;
    Project: ApiClient.Project;
}

export class WorkingProjectState implements IWorkingProjectState {
    public HasCheckedIsSet: boolean;
    public IsSet: boolean;
    public Project: ApiClient.Project;

    constructor() {
        this.HasCheckedIsSet = false;
        this.IsSet = false;
        this.Project = null;
    }
}
