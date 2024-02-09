import { SolverOptType } from "../enums/enum";

export class SolverOpt {
    public type: SolverOptType
    constructor(type) {
        this.type = type;
    }
    toJson() {
        return {}
    }
}

export class RedfieldSolverOpt extends SolverOpt {
    public int_atol: number
    public int_rtol: number
    public unitary_ode_opt: { "alg": string, "rtol": number, "atol": number }
    public ode_opt: { "alg": string, "nsteps": number }
    constructor(int_atol, int_rtol, unitary_ode_opt, ode_opt) {
        super(SolverOptType.Redfield)
        this.int_atol = int_atol
        this.int_rtol = int_rtol
        this.unitary_ode_opt = unitary_ode_opt
        this.ode_opt = ode_opt
    }
    toJson() {
        return {
            "type": this.type,
            "int_atol": this.int_atol,
            "int_rtol": this.int_rtol,
            "unitary_ode_opt": this.unitary_ode_opt,
            "ode_opt": this.ode_opt
        }
    }
}

export class LindbladSolverOpt extends SolverOpt {
    public ode_opt: { "alg": string, "rtol": number, "atol": number }
    constructor(ode_opt) {
        super(SolverOptType.Lindblad)
        this.ode_opt = ode_opt
    }
    toJson() {
        return {
            "type": this.type,
            "ode_opt": this.ode_opt
        }
    }
}

export class SchrodingerSolverOpt extends SolverOpt {
    public ode_opt: { "alg": string, "rtol": number, "atol": number }
    constructor(ode_opt) {
        super(SolverOptType.Schrodinger)
        this.ode_opt = ode_opt
    }
    toJson() {
        return {
            "type": this.type,
            "ode_opt": this.ode_opt
        }
    }
}