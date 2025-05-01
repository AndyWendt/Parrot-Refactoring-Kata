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
                return new EuropeanParrot(parrotType, numberOfCoconuts, voltage, isNailed);
            case ParrotTypes.AFRICAN:
                return new AfricanParrot(parrotType, numberOfCoconuts, voltage, isNailed);
            case ParrotTypes.NORWEGIAN_BLUE:
                return new NorwegianBlueParrot(parrotType, numberOfCoconuts, voltage, isNailed);
            default:
                throw new Error("Should be unreachable");
        }
    }

    constructor(private parrotType: ParrotTypes,
                protected numberOfCoconuts: number,
                protected voltage: number,
                private isNailed: boolean) {
    }

    public getSpeed(): number {
        switch (this.parrotType) {
            case ParrotTypes.NORWEGIAN_BLUE:
                return (this.isNailed) ? 0 : this.getBaseSpeedWithVoltage(this.voltage);
        }
        throw new Error("Should be unreachable");
    }

    protected getBaseSpeed(): number {
        return 12;
    }

    private getBaseSpeedWithVoltage(voltage: number): number {
        return Math.min(24, voltage * this.getBaseSpeed());
    }

    public getCry(): String {
        throw new Error("Should be unreachable");
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
    public getCry(): String {
        return this.voltage > 0 ? "Bzzzzzz" : "...";
    }
}
