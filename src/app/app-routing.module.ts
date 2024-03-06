import { SimulateCircuitComponent } from './features/simulate-circuit/simulate-circuit.component';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { DesignModelComponent } from './features/design-model/design-model.component';
import { DevicePrescriptionComponent } from './features/device-prescription/device-prescription.component';
import { CustomReuseStrategy } from './app-routing.strategy';

const routes: Routes = [
  {
    path: '',
    component: DevicePrescriptionComponent
  },
  {
    path: 'design-model',
    component: DesignModelComponent,
    data: { defaultReuseStrategy: true }
  },
  {
    path: 'simulate-circuit',
    component: SimulateCircuitComponent,
    data: { defaultReuseStrategy: false }
  }
  // {
  //     path: 'simulate-model',
  //     component: SimulateModelComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ]
})
export class AppRoutingModule { }
