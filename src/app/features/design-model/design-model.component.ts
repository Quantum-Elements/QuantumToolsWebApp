import { ApiService } from './../../core/api.service';
import { ConfigService } from './../../core/config.service';
import { Coupling } from './../../shared/models/coupling.model';
import { Component } from '@angular/core';
import { Qudit } from '../../shared/models/qudit.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

export enum WorkflowStep {
  DesignModel,
  GateConfig,
  DesignCircuit
}

@Component({
  selector: 'design-model',
  templateUrl: './design-model.component.html',
  styleUrl: './design-model.component.scss'
})
export class DesignModelComponent {
  WorkflowStep = WorkflowStep
  public step: WorkflowStep = WorkflowStep.DesignModel
  public selectedQudit!: Qudit;
  public selectedCoupling!: Coupling
  couplingMode: boolean = false;
  selectedQuditToCouple: Qudit[] = [];
  public nav = 'gate-type'

  faSpinner = faSpinner;
  simulationInProgress = false;
  simulationComplete = false;
  private jobStatusSubscription: Subscription;
  constructor(public configService: ConfigService, public apiService: ApiService) {
    this.jobStatusSubscription = this.apiService.getJobStatusSubject().subscribe((status) => {
      if (status.done) {
        this.simulationInProgress = false;
        this.simulationComplete = true;
        console.log('Job is done. Result:', status.result);
        // Do something with the result, update UI, etc.
      } else {
        console.error('Job failed with error:', status.error);
        // Handle error, update UI, etc.
      }
    });
  }

  setNav(nav) {
    this.nav = nav
  }

  toggleCouplingMode() {
    this.selectedQudit = null;
    this.couplingMode = !this.couplingMode;
  }
  quditSelected(q: any) {
    if (!q) {
      this.selectedQudit = null;
      return
    }
    if (this.couplingMode) {
      this.selectedQuditToCouple.push(q)
      if (this.selectedQuditToCouple.length == 2) {
        this.configService.addCoupling(this.selectedQuditToCouple[0], this.selectedQuditToCouple[1])
        this.selectedQuditToCouple = []
        this.toggleCouplingMode()
      }
    } else {
      this.selectedQudit = q
      this.selectedCoupling = null
    }
  }
  couplingSelected(coupling: any) {
    this.selectedCoupling = coupling
    this.selectedQudit = null
  }
  simulate() {
    this.simulationInProgress = true;
    this.apiService.simulate();
  }
  cancel() {
    this.simulationInProgress = false;
    this.simulationComplete = false;
  }
  getFidelity() {
    return Math.round(this.apiService.gate_fidelity * 10000) / 100
  }
}
