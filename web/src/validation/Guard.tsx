export class Guard {
    public static thisString(value: string): GuardThisString {
        return new GuardThisString(value);
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
