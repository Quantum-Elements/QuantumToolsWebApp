import { RotationalAxis } from "../enums/enum";
import { Qudit } from "./qudit.model";

export class Coupling {
    qudit1: Qudit;
    axis1: RotationalAxis;
    qudit2: Qudit;
    axis2: RotationalAxis;
    frequency: number;

    constructor(qudit1: Qudit, qudit2: Qudit, axis1: RotationalAxis = RotationalAxis.Z, axis2: RotationalAxis = RotationalAxis.Z, frequency: number = 7.72596981097004e-6) {
        this.qudit1 = qudit1
        this.qudit2 = qudit2
        this.axis1 = axis1;
        this.axis2 = axis2;
        this.frequency = frequency;
    }
    toJSON() {
        return {
            "qudits": [this.qudit1.id + 1, this.qudit2.id + 1],
            "strength": this.frequency,
            "operator": [this.axis1, this.axis2]
        }
    }
}
