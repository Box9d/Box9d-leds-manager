export class ValidationResult {

    public static Valid(): ValidationResult {
        let result = new ValidationResult();
        result.isValid = true;
        result.errorMessage = null;
        return result;
    }

    public static Invalid(message: string): ValidationResult {
        let result = new ValidationResult();
        result.isValid = false;
        result.errorMessage = message;
        return result;
    }

    public errorMessage: string;
    public isValid: boolean;

    private constructor() {
    }
}
