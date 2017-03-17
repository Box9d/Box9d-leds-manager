import * as ApiClient from "../../../api/build/ApiClient";

export interface IOpenProjectState {
    ModalIsOpen: boolean;
    Projects: ApiClient.Project[];
    ShouldFetchProjects: boolean;
}

export class OpenProjectState implements IOpenProjectState {
    public ModalIsOpen: boolean;
    public Projects: ApiClient.Project[];
    public ShouldFetchProjects: boolean;

    constructor() {
        this.Projects = new Array<ApiClient.Project>();
        this.ShouldFetchProjects = true;
        this.ModalIsOpen = false;
    }
}
