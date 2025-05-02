export enum ParrotTypes {
    EUROPEAN,
    AFRICAN,
    NORWEGIAN_BLUE,
}

export class Parrot {
    public static createInstance(parrotType: ParrotTypes,
                                 numberOfCoconuts: number,
                                 voltage: number,
                                 isNailed: boolean) {
        switch (parrotType) {
            case ParrotTypes.EUROPEAN:
                return new EuropeanParrot();
            case ParrotTypes.AFRICAN:
                return new AfricanParrot(numberOfCoconuts, voltage, isNailed);
            case ParrotTypes.NORWEGIAN_BLUE:
                return new NorwegianBlueParrot(numberOfCoconuts, voltage, isNailed);
            default:
                throw new Error("Should be unreachable");
        }
    }

    public getSpeed(): number {
        throw new Error("Should be unreachable");
    }

    public getCry(): String {
        throw new Error("Should be unreachable");
    }

    protected getBaseSpeed(): number {
        return 12;
    }
}

class EuropeanParrot extends Parrot {
    public getSpeed(): number {
        return this.getBaseSpeed();
    }

    public getCry(): String {
        return "Sqoork!";
    }
}

class AfricanParrot extends Parrot {
    constructor(private numberOfCoconuts: number,
                private voltage: number,
                private isNailed: boolean) {

        super()
    }

    public getSpeed(): number {
        return Math.max(0, this.getBaseSpeed() - this.getLoadFactor() * this.numberOfCoconuts);
    }

    public getCry(): String {
        return "Sqaark!";
    }

    private getLoadFactor(): number {
        return 9;
    }
}

class NorwegianBlueParrot extends Parrot {
    constructor(private numberOfCoconuts: number,
                private voltage: number,
                private isNailed: boolean) {

        super()
    }

    public getSpeed(): number {
        return (this.isNailed) ? 0 : this.getBaseSpeedWithVoltage(this.voltage);
    }

    public getCry(): String {
        return this.voltage > 0 ? "Bzzzzzz" : "...";
    }

    private getBaseSpeedWithVoltage(voltage: number): number {
        return Math.min(24, voltage * this.getBaseSpeed());
    }
}
