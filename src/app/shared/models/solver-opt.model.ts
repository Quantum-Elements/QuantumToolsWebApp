import { SolverOptType } from "../enums/enum";
import { LinearExponential, OdeSolver, Tsit5, VCABM } from "./ode-solver.model";

export function SolverOptBuilder(type: SolverOptType) {
    if (type == SolverOptType.Lindblad) {
        return new LindbladSolverOpt()
    } else if (type == SolverOptType.Redfield) {
        return new RedfieldSolverOpt()
    } else if (type == SolverOptType.Schrodinger) {
        return new SchrodingerSolverOpt();
    } else {
        return null
    }
}

export class SolverOpt {
    public type: SolverOptType
    public ode_solver: OdeSolver;
    constructor(type) {
        this.type = type;
    }
    toJson() {
        return {}
    }
}

export class RedfieldSolverOpt extends SolverOpt {
    public ode_solver: OdeSolver = new LinearExponential();
    public unitary_ode_solver: OdeSolver = new Tsit5();
    public int_atol: number
    public int_rtol: number
    constructor() {
        super(SolverOptType.Redfield)
    }
    toJson() {
        return {
            "type": this.type,
            "int_atol": this.int_atol,
            "int_rtol": this.int_rtol,
            "unitary_ode_opt": this.unitary_ode_solver.toJson(),
            "ode_opt": this.ode_solver.toJson()
        }
    }
}

export class LindbladSolverOpt extends SolverOpt {
    public ode_solver: OdeSolver = new VCABM();
    constructor() {
        super(SolverOptType.Lindblad)
    }
    toJson() {
        return {
            "type": this.type,
            "ode_opt": this.ode_solver.toJson()
        }
    }
}

export class SchrodingerSolverOpt extends SolverOpt {
    public ode_solver: OdeSolver = new VCABM();
    constructor() {
        super(SolverOptType.Schrodinger)
    }
    toJson() {
        return {
            "type": this.type,
            "ode_opt": this.ode_solver.toJson()
        }
    }
}