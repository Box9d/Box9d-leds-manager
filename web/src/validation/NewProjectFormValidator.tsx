import { INewProjectFormProps } from "../presentation/NewProjectFormPresenter";
import { Guard } from "../validation/Guard";
import { ValidationResult } from "../validation/ValidationResult";

export class NewProjectFormValidator {
    public validateName(name: string): ValidationResult {
        if (!Guard.thisString(name).againstNullOrEmpty() || !Guard.thisString(name).invalidLength(1, 100)) {
            return ValidationResult.Invalid("Project name should be between 1 and 100 characters");
        }

        return ValidationResult.Valid();
    }
}
