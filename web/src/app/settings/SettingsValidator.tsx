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
        if (this.validateStartIp().isValid && this.validateEndIp().isValid
            && this.validatePingTimeout().isValid && this.validatePlaybackBuffer().isValid) {
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

    public validatePingTimeout(): ValidationResult {
        if (!Guard.thisNumber(this.state.pingTimeout).withinRange(1, 1000)) {
            return ValidationResult.Invalid("Ping timeout should be between 1 and 1000 milliseconds");
        }

        return ValidationResult.Valid();
    }

    public validatePlaybackBuffer(): ValidationResult {
        if (!Guard.thisNumber(this.state.playbackBuffer).withinRange(1000, 60000)) {
            return ValidationResult.Invalid("Playback buffer time should be between 1000 and 60000 milliseconds");
        }

        return ValidationResult.Valid();
    }
}
