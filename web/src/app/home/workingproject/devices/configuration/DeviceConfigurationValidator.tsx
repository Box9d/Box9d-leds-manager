import { Guard } from "../../../../../validation/Guard";
import { ValidationResult } from "../../../../../validation/ValidationResult";
import { IDeviceConfigurationLocalState } from "./DeviceConfigurationPresenter";

export class DeviceConfigurationValidator {
    private state: IDeviceConfigurationLocalState;

    constructor(state: IDeviceConfigurationLocalState) {
        this.state = state;
    }

    public validateState(): ValidationResult {
        if (this.validateWidthPixels().isValid && this.validateHeightPixels().isValid) {
            return ValidationResult.Valid();
        }

        return ValidationResult.Invalid("State is invalid");
    }

    public validateWidthPixels(): ValidationResult {

        if (this.state.widthPixels < 1) {
            return ValidationResult.Invalid("Width must be a positive integer");
        }

        return ValidationResult.Valid();
    }

    public validateHeightPixels(): ValidationResult {

        if (this.state.heightPixels < 1) {
            return ValidationResult.Invalid("Height must be a positive integer");
        }

        return ValidationResult.Valid();
    }
}
