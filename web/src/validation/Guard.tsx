export class Guard {
    public static thisString(value: string): GuardThisString {
        return new GuardThisString(value);
    }

    public static thisNumber(value: number): GuardThisNumber {
        return new GuardThisNumber(value);
    }
}

class GuardThisString {

    public val: string;

    constructor(val: string) {
        this.val = val;
    }

    public invalidLength(min: number, max: number): boolean {
        return this.val.length <= max && this.val.length >= min;
    }

    public againstNullOrEmpty() {
        return this.val != null && this.val !== "";
    }
}

class GuardThisNumber {
    public val: number;

    constructor(val: number) {
        this.val = val;
    }

    public withinRange(min: number, max: number): boolean {
        return this.val >= min && this.val <= max;
    }
}
