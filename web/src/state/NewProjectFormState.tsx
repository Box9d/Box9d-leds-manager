export interface INewProjectFormState {
    Name: string;
    SubmitAttempts: number;
    IsSubmitting: boolean;
}

export class NewProjectFormState implements INewProjectFormState {
    public Name: string;
    public SubmitAttempts: number;
    public IsSubmitting: boolean;

    constructor() {
        this.Name = "";
        this.SubmitAttempts = 0;
        this.IsSubmitting = false;
    }
}
