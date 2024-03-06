import { SimulateCircuitModule } from './features/simulate-circuit/simulate-circuit.module';
import { CoreModule } from './core/core.module';
import { DesignModelModule } from './features/design-model/design-model.module';
import { DevicePrescriptionModule } from './features/device-prescription/device-prescription.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DevicePrescriptionModule,
    DesignModelModule,
    SimulateCircuitModule,
    CoreModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
