import { RotationalAxis } from './../enums/enum';
import { Pulse, GaussianPulse, NoPulse, GaussianSquaredPulse } from './pulse.model';
import { GateType } from "../enums/enum";

export class Gate {
    public type: GateType;
    public isSingle: boolean;
    public qudit: string | undefined
    public theta: number | undefined;
    public duration: number | undefined;
    public drive_freq: number | undefined;
    public x_drive: Pulse = new NoPulse(RotationalAxis.X);
    public y_drive: Pulse = new NoPulse(RotationalAxis.Y);

    public isPlaceHolder = false

    constructor(type: GateType) {
        this.type = type;
    }
    public clone() {
        let cloneGate = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        cloneGate.x_drive = this.x_drive.clone()
        cloneGate.y_drive = this.y_drive.clone()
        return cloneGate
    }
    public toJson(): any {
        return {
            "gate": `${this.type.toUpperCase()}Gate`,
            "qudit": [this.qudit],
            ...{ "duration": this.duration },
            ...{ "theta": this.theta * 3.1416 },
            "pulse": {
                "drive_freq": this.drive_freq,
                ...this.x_drive.toJson(),
                ...this.y_drive.toJson()
            }
        }
    }
}

export class RxGate extends Gate {
    constructor() {
        super(GateType.Rx)
        this.isSingle = true;
        this.duration = 30;
        this.theta = 1;
        this.x_drive = new GaussianPulse(RotationalAxis.X)
    }
}

export class RyGate extends Gate {
    constructor() {
        super(GateType.Ry)
        this.isSingle = true;
        this.duration = 30;
        this.theta = 1;
        this.y_drive = new GaussianPulse(RotationalAxis.Y)
    }
}

export class RzGate extends Gate {
    constructor() {
        super(GateType.Rz)
        this.isSingle = true;
        this.theta = 1;
        this.duration = 0
    }
}

export class CRGate extends Gate {
    public qudit_b: string;
    constructor() {
        super(GateType.CR)
        this.isSingle = false;
        this.duration = 100;
        this.theta = 1;
        this.x_drive = new GaussianSquaredPulse(RotationalAxis.X)
    }
    public toJson(): any {
        return {
            "gate": `${this.type.toUpperCase()}Gate`,
            "qudit": [this.qudit, this.qudit_b],
            "duration": this.duration,
            "theta": this.theta * 3.1416,
            "pulse":
            {
                [this.qudit]: {
                    "drive_freq": this.drive_freq,
                    ...this.x_drive.toJson(),
                    ...this.y_drive.toJson()
                }
            }
        }
    }
}

// export class IswapGate extends Gate {
//     constructor() {
//         super(GateType.Iswap)
//     }
// }

export class IGate extends Gate {
    constructor() {
        super(GateType.I)
        this.isSingle = true;
        this.duration = 40;
        this.theta = 1;
    }
}

export class PlaceHolder extends Gate {
    public isPlaceHolder = true
    constructor() {
        super(GateType.PlaceHolder)
        this.isSingle = true;
    }
}

export class DoubleGatePlaceHolder extends Gate {
    public originGate: Gate;
    public isPlaceHolder = true
    constructor(gate: Gate) {
        super(GateType.DoubleGatePlaceHolder)
        this.originGate = gate
        this.isSingle = true
    }
}
