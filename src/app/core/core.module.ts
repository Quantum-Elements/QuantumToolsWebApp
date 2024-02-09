import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    ApiService
  ]
})
export class CoreModule { }
