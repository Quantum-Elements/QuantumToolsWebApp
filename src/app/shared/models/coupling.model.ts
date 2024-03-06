import { RotationalAxis } from "../enums/enum";
import { Qudit } from "./qudit.model";

export class Coupling {
    qudit1: Qudit;
    axis1: RotationalAxis;
    qudit2: Qudit;
    axis2: RotationalAxis;
    frequency: number;
    j: number;

    constructor(qudit1: Qudit, qudit2: Qudit) {
        this.qudit1 = qudit1
        this.qudit2 = qudit2
        this.axis1 = RotationalAxis.Z;
        this.axis2 = RotationalAxis.Z;
        this.frequency = 10;
        this.j = 3.8
    }
    exchangeToJSON() {
        return {
            "qudits": [this.qudit1.id + 1, this.qudit2.id + 1],
            "J": this.j * 1e-3
        }
    }
    parasiticToJson() {
        return {
            "qudits": [this.qudit1.id + 1, this.qudit2.id + 1],
            "strength": this.frequency * 1e-6,
            "operator": [this.axis1, this.axis2]
        }
    }
    toJSON() {
        return {
            "exchange": [
                {
                    "qudits": [this.qudit1.id + 1, this.qudit2.id + 1],
                    "J": this.j * 1e-3
                }
            ],
            "parasitic": [
                {
                    "qudits": [this.qudit1.id + 1, this.qudit2.id + 1],
                    "strength": this.frequency * 1e-6,
                    "operator": [this.axis1, this.axis2]
                }
            ]
        }
    }
}
