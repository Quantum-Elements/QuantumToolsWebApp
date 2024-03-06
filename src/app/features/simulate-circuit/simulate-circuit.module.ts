import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulateCircuitComponent } from './simulate-circuit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { GateComponent } from './components/gate/gate.component';
import { GateSettingDialogComponent } from './components/gate-setting-dialog/gate-setting-dialog.component';
import { ProbabilityGraphComponent } from './components/probability-graph/probability-graph.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    SimulateCircuitComponent,
    GateComponent,
    GateSettingDialogComponent,
    ProbabilityGraphComponent
  ],
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    FormsModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SimulateCircuitModule { }
