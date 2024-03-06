import { erf } from 'mathjs';
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
    aera(d, s) {
        return (-d + Math.exp(d ** 2 / (8 * s ** 2)) * Math.sqrt(2 * Math.PI) * s * erf(d / (2 * s * Math.sqrt(2)))) / (-1 + Math.exp(d ** 2 / (8 * s ** 2)))
    }
    calculateAmplitude(theta, duration) {
        return;
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
    calculateAmplitude(theta: number, duration: number) {
        let amplitudeNoRounded = theta * Math.PI / (2 * Math.PI * this.aera(duration, this.sigma))
        this.amplitude = Math.round(amplitudeNoRounded * 1e4) / 1e4
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
    calculateAmplitude(theta: number, duration: number) {
        let amplitudeNoRounded = theta * Math.PI / (2 * Math.PI * duration)
        this.amplitude = Math.round(amplitudeNoRounded * 1e4) / 1e4
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
    calculateAmplitude(theta: number, duration: number) {
        let amplitudeNoRounded = theta * Math.PI / (2 * Math.PI * this.aera(duration - this.width, this.sigma))
        this.amplitude = Math.round(amplitudeNoRounded * 1e4) / 1e4
    }
}