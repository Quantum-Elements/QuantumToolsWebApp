import { PulseShape } from './../enums/enum';
export class Pulse {
    public axis;
    public shape: PulseShape;
    constructor(shape, axis) {
        this.shape = shape
        this.axis = axis
    }
    toJson() {
        return {}
    }
}

export class GaussianPulse extends Pulse {
    public amplitude: number;
    public sigma: number;
    constructor(axis, amplitude, sigma) {
        super(PulseShape.Gaussian, axis)
        this.amplitude = amplitude
        this.sigma = sigma
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

export class SqauaredPulse extends Pulse {
    public amplitude: number;
    constructor(axis, amplitude) {
        super(PulseShape.Squared, axis)
        this.amplitude = amplitude
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
    constructor(axis, amplitude, sigma, width) {
        super(PulseShape.GaussinSquared, axis)
        this.amplitude = amplitude
        this.sigma = sigma
        this.width = width
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

export class PulseSchedule {
    public drive_freq: number;
    public start: number;
    public duration: number;
    public x_drive: Pulse | undefined;
    public y_drive: Pulse | undefined;
    public pulse: Pulse[];

    constructor(drive_freq, start, duration, x_drive?, y_drive?) {
        this.drive_freq = drive_freq
        this.start = start
        this.duration = duration
        this.x_drive = x_drive
        this.y_drive = y_drive
    }

    toJson() {
        const json: any = {
            "drive_freq": this.drive_freq,
            "start": this.start,
            "duration": this.duration
        };

        if (this.x_drive) {
            Object.assign(json, this.x_drive.toJson());
        }

        if (this.y_drive) {
            Object.assign(json, this.y_drive.toJson());
        }

        return json;
    }
}