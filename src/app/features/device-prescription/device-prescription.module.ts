import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicePrescriptionComponent } from './device-prescription.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DevicePrescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule
  ]
})
export class DevicePrescriptionModule { }
