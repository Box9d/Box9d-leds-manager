import { Guard } from "../../../../../validation/Guard";
import { ValidationResult } from "../../../../../validation/ValidationResult";
import { IDeviceConfigurationProps } from "./DeviceConfigurationPresenter";

export class DeviceConfigurationValidator {
    private props: IDeviceConfigurationProps;

    constructor(props: IDeviceConfigurationProps) {
        this.props = props;
    }

    public validateForm(): ValidationResult {
        if (this.validateHorizontalPixels().isValid && this.validateVerticalPixels().isValid) {
            return ValidationResult.Valid();
        }

        return ValidationResult.Invalid("Something is invalid");
    }

    public validateHorizontalPixels(): ValidationResult {

        if (!this.props.deviceConfiguration.numberOfHorizontalPixels || this.props.deviceConfiguration.numberOfHorizontalPixels < 1 || this.props.deviceConfiguration.numberOfHorizontalPixels > 150) {
            return ValidationResult.Invalid("Width must be a positive integer, no larger than 150");
        }

        return ValidationResult.Valid();
    }

    public validateVerticalPixels(): ValidationResult {

        if (!this.props.deviceConfiguration.numberOfVerticalPixels || this.props.deviceConfiguration.numberOfVerticalPixels < 1 || this.props.deviceConfiguration.numberOfVerticalPixels > 150) {
            return ValidationResult.Invalid("Height must be a positive integer, no larger than 150");
        }

        return ValidationResult.Valid();
    }

    public validateHorizontalAndVerticalPixels(): ValidationResult {
        if (this.validateHorizontalPixels().isValid && this.validateVerticalPixels().isValid) {
            return ValidationResult.Valid();
        }

        return ValidationResult.Invalid("Something is invalid");
    }
}
