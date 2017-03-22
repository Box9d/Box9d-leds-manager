import { Guard } from "../../validation/Guard";
import { ValidationResult } from "../../validation/ValidationResult";
import { ISettingsProps, ISettingsLocalState } from "./SettingsPresenter";

export class SettingsValidator {
    private state: ISettingsLocalState;

    constructor(state: ISettingsLocalState) {
        this.state = state;
    }

    public validateState(): ValidationResult {
        if (this.validateStartIp().isValid && this.validateEndIp().isValid) {
            return ValidationResult.Valid();
        }

        return ValidationResult.Invalid("State is invalid");
    }

    public validateStartIp(): ValidationResult {
        if (!Guard.thisString(this.state.editIpStart).againstNullOrEmpty()) {
            return ValidationResult.Invalid("IP cannot be empty");
        }

        return ValidationResult.Valid();
    }

    public validateEndIp(): ValidationResult {
        if (!Guard.thisString(this.state.editIpEnd).againstNullOrEmpty()) {
            return ValidationResult.Invalid("IP cannot be empty");
        }

        return ValidationResult.Valid();
    }
}
