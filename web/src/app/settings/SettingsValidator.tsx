import { Guard } from "../../validation/Guard";
import { ValidationResult } from "../../validation/ValidationResult";
import { ISettingsProps, ISettingsLocalState } from "./SettingsPresenter";

export class SettingsValidator {
    private state: ISettingsLocalState;
    private ipRegex = new RegExp("^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$");

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

        if (!this.ipRegex.test(this.state.editIpStart)) {
            return ValidationResult.Invalid("IP must be a valid IP address");
        }

        return ValidationResult.Valid();
    }

    public validateEndIp(): ValidationResult {
        if (!Guard.thisString(this.state.editIpEnd).againstNullOrEmpty()) {
            return ValidationResult.Invalid("IP cannot be empty");
        }

        if (!this.ipRegex.test(this.state.editIpEnd)) {
            return ValidationResult.Invalid("IP must be a valid IP address");
        }

        return ValidationResult.Valid();
    }
}
