import { RedfieldSolverOpt, LindbladSolverOpt } from './../shared/models/solver-opt.model';
import { ApiService } from './api.service';
import { Coupling } from './../shared/models/coupling.model';
import { Qudit } from './../shared/models/qudit.model';
import { Injectable } from '@angular/core';
import { SolverOpt } from '../shared/models/solver-opt.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public qudits: Qudit[] = []
  public couplings: Coupling[] = []
  public energyLevels: number = 2;
  public solver_opt: SolverOpt = new LindbladSolverOpt({
    "alg": "VCABM",
    "atol": 1e-6,
    "rtol": 1e-6
  })
  constructor() { }
  addQudit() {
    let newQudit: Qudit = new Qudit(this.qudits.length, this.energyLevels)
    this.qudits.push(newQudit)
  }

  removeQudit(qudit: Qudit) {
    let index = this.qudits.indexOf(qudit)
    this.qudits.splice(index, 1)
  }

  addCoupling(q1: Qudit, q2: Qudit) {
    let coupling: Coupling = new Coupling(q1, q2)
    this.couplings.push(coupling)
  }

  removeCoupling(coupling: Coupling) {
    let index = this.couplings.indexOf(coupling)
    this.couplings.splice(index, 1)
  }
}
