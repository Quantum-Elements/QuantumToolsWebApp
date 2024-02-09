import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNumberInputComponent } from './components/custom-number-input/custom-number-input.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CanvasViewComponent } from './components/canvas-view/canvas-view.component';
import { QuditComponent } from './components/qudit/qudit.component';
import { CouplingComponent } from './components/coupling/coupling.component';



@NgModule({
  declarations: [
    CanvasViewComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomButtonComponent,
    QuditComponent,
    CouplingComponent
  ],
  imports: [
    CommonModule,
    CdkDrag
  ],
  exports: [
    CanvasViewComponent,
    CustomNumberInputComponent,
    CustomSelectComponent,
    CustomButtonComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
