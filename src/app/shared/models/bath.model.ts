import { BathType, LindbladOperator, RotationalAxis } from "../enums/enum";

export class Bath {
    public type: BathType;
    public axis: RotationalAxis | LindbladOperator;

    constructor(type = BathType.Ohmic, axis: RotationalAxis | LindbladOperator = RotationalAxis.Z) {
        this.type = type;
        this.axis = axis;
    }

    public toJson(): any {

    }
}

export class OhmicBath extends Bath {
    public strength: number;
    public exp: number = 1e-5;
    public frequency: number;
    public temperature: number;
    constructor(
        axis = RotationalAxis.Z,
        strength = 1.1765,
        frequency = 2,
        temperature = 20
    ) {
        super(BathType.Ohmic, axis);
        this.strength = strength
        this.frequency = frequency
        this.temperature = temperature
    }

    public toJson(): any {
        return {
            "coupling": this.axis,
            "bath": {
                "type": this.type,
                "params": {
                    "eta": this.strength * this.exp,
                    "fc": this.frequency,
                    "T": this.temperature
                }
            }
        }
    }
}

export class SpinFluctuatorBath extends Bath {
    strength: number;
    frequency: number;
    temperature: number;
    constructor(
        axis = RotationalAxis.X,
        strength = 1.1764967334034104e-5,
        frequency = 2,
        temperature = 20
    ) {
        super(BathType.Fluctuator, axis)
        this.strength = strength;
        this.frequency = frequency;
        this.temperature = temperature
    }
}

export class LindbladBath extends Bath {
    gamma: number;
    exp: number = 1;
    constructor(
        axis = LindbladOperator.Z,
        gamma = 0.11764967334034104,
    ) {
        super(BathType.Lindblad, axis)
        this.gamma = gamma;
    }
    public toJson(): any {
        return {
            "coupling": this.axis,
            "bath": {
                "type": this.type.toLowerCase(),
                "gamma": this.gamma * this.exp
            }
        }
    }
}
