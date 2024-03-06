import { ApiService } from './../../core/api.service';
import { RedfieldSolverOpt } from './../../shared/models/solver-opt.model';
import { GateType, OdeSolverType, SolverOptType } from './../../shared/enums/enum';
import { GateSettingDialogComponent } from './components/gate-setting-dialog/gate-setting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from './../../core/config.service';
import { RxGate, RyGate, RzGate, CRGate, IGate, PlaceHolder, DoubleGatePlaceHolder } from './../../shared/models/gate.model';
import { Component, ElementRef } from '@angular/core';
import { Gate } from '../../shared/models/gate.model';
import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Qudit } from '../../shared/models/qudit.model';
import { SolverOptBuilder } from '../../shared/models/solver-opt.model';
import { OdeSolverBuilder } from '../../shared/models/ode-solver.model';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simulate-circuit',
  templateUrl: './simulate-circuit.component.html',
  styleUrl: './simulate-circuit.component.scss'
})
export class SimulateCircuitComponent {
  public availableGates: Gate[] = [
    new RxGate(),
    new RyGate(),
    new RzGate(),
    new CRGate(),
    new IGate()
  ]
  public solverOptions = Object.values(SolverOptType)
  public odeSolverOptions = Object.values(OdeSolverType)
  public doubleGateMode: any;
  faSpinner = faSpinner;
  simulationInProgress: boolean;
  simulationComplete: boolean;
  private jobStatusSubscription: Subscription;
  public histogramData = []
  constructor(private elementRef: ElementRef, public configService: ConfigService, public apiService: ApiService, public dialog: MatDialog) {
    this.jobStatusSubscription = this.apiService.getJobStatusSubject().subscribe((status) => {
      if (status.done) {
        this.simulationInProgress = false;
        this.simulationComplete = true;
        console.log('Job is done. Result:', status.result);
        this.histogramData = status.result
        // Do something with the result, update UI, etc.
      } else {
        console.error('Job failed with error:', status.error);
        // Handle error, update UI, etc.
      }
    });
  }
  openGateSettings(gate: Gate, index?: number) {
    let prevIndex = index
    const dialogRef = this.dialog.open(GateSettingDialogComponent, { width: '500px', data: gate })
    dialogRef.afterClosed().subscribe(result => {
      if (result && index) {
        let { prevGate, newGate } = result
        let prevQudit = this.configService.findQuditByName(prevGate.qudit)
        let newQudit = this.configService.findQuditByName(newGate.qudit)
        prevQudit.gates.splice(prevIndex, 1)
        newQudit.gates.splice(prevIndex, 0, newGate)
      }
    })
  }

  getCoupledQudits(qudit: Qudit) {
    const relatedQudits: Qudit[] = []
    this.configService.couplings.forEach(c => {
      if (c.qudit1 === qudit) {
        relatedQudits.push(c.qudit2)
      } else if (c.qudit2 === qudit) {
        relatedQudits.push(c.qudit1)
      }
    })
    return relatedQudits
  }
  quditSelectedForDoubleGate(qudit: Qudit) {
    if (!this.doubleGateMode) {
      return;
    }
    this.doubleGateMode.gate.qudit_b = qudit.name;
    this.doubleGateMode.gate.drive_freq = qudit.frequency
    const element = this.elementRef.nativeElement.ownerDocument.getElementById(this.assignGateID(this.doubleGateMode.qudit_a, this.doubleGateMode.gate))
    let height = 60 * (Math.abs(qudit.id - this.doubleGateMode.qudit_a.id) + 1) + 14 * Math.abs(qudit.id - this.doubleGateMode.qudit_a.id)
    element.classList.add("double")
    if (qudit.id < this.doubleGateMode.qudit_a.id) {
      element.classList.add("reverse")
    }
    element.style.height = `${height}px`
    // Add placeholder gates to list to occupy empty spots that double gate creates
    this.fillDoubleGatePlaceHolder(this.doubleGateMode.gate)
    this.doubleGateMode = undefined;
  }

  resetDoubleGatePlaceholder(event: CdkDragDrop<any>) {
    console.log(event)
    const container = event.container
    const nearestDoubleGate = container.data.slice(event.currentIndex + 1).find(gate => !gate.isSingle || gate.type == GateType.DoubleGatePlaceHolder)
    if (!nearestDoubleGate) {
      // No double gate placed after where gate was placed
      return
    }
    // remove all the placeholder gate before the double gate until real gate appears on each qudit
    const nearestDoublegateIndex = container.data.indexOf(nearestDoubleGate)
    const originGate = nearestDoubleGate.type == GateType.DoubleGatePlaceHolder ? nearestDoubleGate.originGate : nearestDoubleGate
    const qudit_a = this.configService.findQuditByName(originGate.qudit)
    const qudit_b = this.configService.findQuditByName(originGate.qudit_b)
    for (let i = Math.min(qudit_a.id, qudit_b.id); i <= Math.max(qudit_a.id, qudit_b.id); i++) {
      for (let j = nearestDoublegateIndex; j--; j >= 0) {
        if (this.configService.qudits[i].gates[j].isPlaceHolder) {
          this.configService.qudits[i].gates.splice(j, 1)
        }
      }
    }
    if (!nearestDoubleGate.isSingle) {
      // Origin Gate Case
      // Fill placeholder gate between gate that was placed and the double gate

    } else {
      // Double Gate Placeholder case
    }
  }
  fillDoubleGatePlaceHolder(gate) {
    // const container = event.container
    // console.log(container)
    let doubleGate;
    let doubleGateIndex;
    const gateList = this.configService.findQuditByName(gate.qudit).gates
    const index = gateList.indexOf(gate)
    if (!gate.isSingle) {
      doubleGate = gate;
      doubleGateIndex = index
    } else {
      doubleGate = gateList.slice(index + 1).find(gate => !gate.isSingle || gate.type == GateType.DoubleGatePlaceHolder)
      doubleGateIndex = gateList.indexOf(doubleGate)
    }
    if (!doubleGate) {
      // No double gate placed after where gate was placed
      return
    }
    // remove all the placeholder gate before the double gate until real gate appears on each qudit
    const originGate = doubleGate.type == GateType.DoubleGatePlaceHolder ? doubleGate.originGate : doubleGate
    const qudit_a = this.configService.findQuditByName(originGate.qudit)
    const qudit_b = this.configService.findQuditByName(originGate.qudit_b)
    for (let i = Math.min(qudit_a.id, qudit_b.id); i <= Math.max(qudit_a.id, qudit_b.id); i++) {
      while (this.configService.qudits[i].gates.length < doubleGateIndex) {
        this.configService.qudits[i].gates.push(new PlaceHolder())
      }
      if (i !== qudit_a.id && (!this.configService.qudits[i].gates[doubleGateIndex] || (this.configService.qudits[i].gates[doubleGateIndex] && this.configService.qudits[i].gates[doubleGateIndex].type == GateType.DoubleGatePlaceHolder))) {
        this.configService.qudits[i].gates.push(new DoubleGatePlaceHolder(originGate))
      }
    }
    console.log(this.configService.qudits)
  }

  assignGateID(qudit, gate) {
    return `${qudit.name}-${gate.type}-${qudit.gates.indexOf(gate)}`
  }

  removeGate(qudit: Qudit, gate) {
    qudit.gates.splice(qudit.gates.indexOf(gate), 1)
  }
  onDrop(event: CdkDragDrop<any>) {
    const clonedGate = event.previousContainer.data[event.previousIndex].clone();
    clonedGate.qudit = event.container.id
    let qudit = this.configService.qudits.find(q => q.name == event.container.id)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Add gate to qudit's gate array

      if (event.previousContainer.id == 'gates') {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        )
      }
      clonedGate.qudit = qudit.name;
      clonedGate.drive_freq = qudit.frequency;
      clonedGate.updateAmplitude()
      // Assign qudit to gate configuration
      event.container.data[event.currentIndex] = clonedGate;
    }
    if (clonedGate.isSingle) {
      this.fillDoubleGatePlaceHolder(clonedGate)
    }
    //this.resetDoubleGatePlaceholder(event)
    if (!clonedGate.isSingle && event.previousContainer !== event.container) {
      let coupledQudit = this.getCoupledQudits(qudit)
      if (coupledQudit.length == 0) {
        //No coupled qudits to place double qudit gate.
        this.entered()
        return;
      }
      this.doubleGateMode = {
        'qudit_a': qudit,
        'gate': clonedGate,
        'available_qudits': coupledQudit,
        'elementRef': event.item.element.nativeElement
      };
    }
    if (event.previousContainer.data) {
      this.availableGates = this.availableGates.filter((f) => !f['temp']);
    }
  }
  exited(event: any) {
    const currentIdx = event.container.data.findIndex(
      (f) => f.type === event.item.data.type
    );
    this.availableGates.splice(currentIdx + 1, 0, {
      ...event.item.data,
      temp: true,
    });
  }
  entered() {
    this.availableGates = this.availableGates.filter((f) => !f['temp']);
  }

  setSolverOption(e) {
    this.configService.solver_opt = SolverOptBuilder(e.target.value)
  }

  setOdeSolver(e) {
    this.configService.solver_opt.ode_solver = OdeSolverBuilder(e.target.value)
  }

  setUnitaryOdeSolver(e: OdeSolverType) {
    (this.configService.solver_opt as RedfieldSolverOpt).unitary_ode_solver = OdeSolverBuilder(e)
  }

  simulate() {
    this.simulationInProgress = true;
    this.apiService.simulate()
  }
  cancel() {
    this.simulationInProgress = false;
    this.simulationComplete = false;
  }
  getFidelity() {
    return Math.round(this.apiService.gate_fidelity * 10000) / 100
  }
}
