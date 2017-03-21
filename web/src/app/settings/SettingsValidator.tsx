import { Guard } from "../../validation/Guard";
import { ValidationResult } from "../../validation/ValidationResult";
import { ISettingsProps } from "./SettingsPresenter";

export class SettingsValidator {
    public validateIp(ip: string): ValidationResult {
        if (!Guard.thisString(ip).againstNullOrEmpty()) {
            return ValidationResult.Invalid("IP cannot be empty");
        }

        return ValidationResult.Valid();
    }
}
