import { OdeSolverType } from "../enums/enum";

export function OdeSolverBuilder(type: OdeSolverType) {
    if (type == OdeSolverType.VCABM) {
        return new VCABM()
    } else if (type == OdeSolverType.Tsit5) {
        return new Tsit5()
    } else if (type == OdeSolverType.Vern9) {
        return new Vern9();
    } else if (type == OdeSolverType.LinearExp) {
        return new LinearExponential();
    } else {
        return null
    }
}

export class OdeSolver {
    public type: OdeSolverType

    toJson() {
        return {}
    }
}

export class VCABM extends OdeSolver {
    public type = OdeSolverType.VCABM
    public atol: number = 1e-6;
    public rtol: number = 1e-6;

    toJson() {
        return {
            "alg": this.type,
            "atol": this.atol,
            "rtol": this.rtol
        }
    }
}

export class Tsit5 extends OdeSolver {
    public type = OdeSolverType.Tsit5
    public atol: number = 10e-4;
    public rtol: number = 10e-4

    toJson() {
        return {
            "alg": this.type,
            "atol": this.atol,
            "rtol": this.rtol
        }
    }
}

export class Vern9 extends OdeSolver {
    public type = OdeSolverType.Vern9
    public atol: number = 10e-4;
    public rtol: number = 10e-4

    toJson() {
        return {
            "alg": this.type,
            "atol": this.atol,
            "rtol": this.rtol
        }
    }
}

export class LinearExponential extends OdeSolver {
    public type = OdeSolverType.LinearExp
    public nsteps = 1

    toJson() {
        return {
            "alg": this.type,
            "nsteps": this.nsteps
        }
    }
}