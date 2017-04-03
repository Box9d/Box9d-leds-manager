import { Guard } from "../../../../../validation/Guard";
import { ValidationResult } from "../../../../../validation/ValidationResult";
import { IDeviceConfigurationProps } from "./DeviceConfigurationPresenter";

export class DeviceConfigurationValidator {
    private props: IDeviceConfigurationProps;

    constructor(props: IDeviceConfigurationProps) {
        this.props = props;
    }

    public validateForm(): ValidationResult {
        if (this.validateHorizontalPixels().isValid
        && this.validateVerticalPixels().isValid
        && this.validateStartAtHorizontalPercentage().isValid
        && this.validateStartAtVerticalPercentage().isValid
        && this.validateHorizontalPercentage().isValid
        && this.validateVerticalPercentage().isValid) {
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

    public validateStartAtHorizontalPercentage(): ValidationResult {
        let startAtHorizontalPercentage = this.props.deviceConfiguration.startAtHorizontalPercentage;

        if (startAtHorizontalPercentage < 0 || startAtHorizontalPercentage > 99) {
            return ValidationResult.Invalid("Start at horizontal percentage must be between 0 and 99%");
        }

        return ValidationResult.Valid();
    }

    public validateStartAtVerticalPercentage(): ValidationResult {
        let startAtVerticalPercentage = this.props.deviceConfiguration.startAtVerticalPercentage;

        if (startAtVerticalPercentage < 0 || startAtVerticalPercentage > 99) {
            return ValidationResult.Invalid("Start at vertical percentage must be between 0 and 99%");
        }

        return ValidationResult.Valid();
    }

    public validateHorizontalPercentage(): ValidationResult {
        let horizontalPercentage = this.props.deviceConfiguration.horizontalPercentage;
        let horizontalPercentageSum = this.props.deviceConfiguration.startAtHorizontalPercentage + horizontalPercentage;

        if (horizontalPercentage < 1) {
            return ValidationResult.Invalid("Width percentage must be between 1 and 100%");
        }

        if (horizontalPercentageSum > 100) {
            return ValidationResult.Invalid("The sum of the start width percentage and width percentage must be lower than or equal to 100%");
        }

        return ValidationResult.Valid();
    }

    public validateVerticalPercentage(): ValidationResult {
        let verticalPercentage = this.props.deviceConfiguration.verticalPercentage;
        let verticalPercentageSum = this.props.deviceConfiguration.startAtVerticalPercentage + verticalPercentage;

        if (verticalPercentage < 1) {
            return ValidationResult.Invalid("Height percentage must be between 1 and 100%");
        }

        if (verticalPercentageSum > 100) {
            return ValidationResult.Invalid("The sum of the start height percentage and height percentage must be lower than or equal to 100%");
        }

        return ValidationResult.Valid();
    }
}
