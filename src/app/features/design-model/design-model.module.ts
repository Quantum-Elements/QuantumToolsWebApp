import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModelComponent } from './design-model.component';
import { FormsModule } from '@angular/forms';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GateTypeComponent } from './components/gate-type/gate-type.component';
import { GatePulseComponent } from './components/gate-pulse/gate-pulse.component';
import { QuditSettingsComponent } from './components/qudit-settings/qudit-settings.component';
import { CouplingSettingsComponent } from './components/coupling-settings/coupling-settings.component';
import { BathDialogComponent } from './components/bath-dialog/bath-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PulseDialogComponent } from './components/pulse-dialog/pulse-dialog.component';


@NgModule({
  declarations: [
    DesignModelComponent,
    GateTypeComponent,
    GatePulseComponent,
    QuditSettingsComponent,
    CouplingSettingsComponent,
    BathDialogComponent,
    PulseDialogComponent
  ],
  imports: [
    CommonModule,
    CdkDrag,
    FormsModule,
    MatCheckboxModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule
    // QuditSettingsComponent,
    // CouplingSettingsComponent,
    // BathDialogComponent
  ],
  exports: [
    // QuditSettingsComponent,
    // CouplingSettingsComponent,
    // BathDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DesignModelModule { }
