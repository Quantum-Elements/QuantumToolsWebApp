import { PulseShape } from './../enums/enum';
export class Pulse {
    public axis;
    public amplitude: number;
    public shape: PulseShape;
    constructor(shape, axis) {
        this.shape = shape
        this.axis = axis
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    toJson() {
        return {}
    }
}

export class NoPulse extends Pulse {
    constructor(axis) {
        super(PulseShape.None, axis)
    }
}

export class GaussianPulse extends Pulse {
    public amplitude: number;
    public sigma: number;
    constructor(axis) {
        super(PulseShape.Gaussian, axis)
        this.amplitude = 0.3
        this.sigma = 4
    }

    toJson() {
        let drive_axis = `${this.axis.toLowerCase()}_drive`
        return {
            [drive_axis]: {
                "type": this.shape.toLowerCase(),
                "amp": this.amplitude,
                "sigma": this.sigma
            }
        }
    }
}

export class SquaredPulse extends Pulse {
    public amplitude: number;
    constructor(axis) {
        super(PulseShape.Squared, axis)
        this.amplitude = 0.3
    }

    toJson() {
        let drive_axis = `${this.axis.toLowerCase()}_drive`
        return {
            [drive_axis]: {
                "type": this.shape.toLowerCase(),
                "amp": this.amplitude
            }
        }
    }
}

export class GaussianSquaredPulse extends Pulse {
    public amplitude: number;
    public sigma: number;
    public width: number
    constructor(axis) {
        super(PulseShape.GaussinSquared, axis)
        this.amplitude = 0.0193
        this.sigma = 4
        this.width = 16
    }

    toJson() {
        let drive_axis = `${this.axis.toLowerCase()}_drive`
        return {
            [drive_axis]: {
                "type": this.shape.toLowerCase(),
                "amp": this.amplitude,
                "sigma": this.sigma
            }
        }
    }
}