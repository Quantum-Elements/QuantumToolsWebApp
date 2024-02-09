import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignModelComponent } from './features/design-model/design-model.component';
import { DevicePrescriptionComponent } from './features/device-prescription/device-prescription.component';

const routes: Routes = [
  {
    path: '',
    component: DevicePrescriptionComponent
  },
  {
    path: 'design-model',
    component: DesignModelComponent
  },
  // {
  //     path: 'simulate-model',
  //     component: SimulateModelComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
