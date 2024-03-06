import { ConfigService } from './../../core/config.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-prescription',
  templateUrl: './device-prescription.component.html',
  styleUrl: './device-prescription.component.scss'
})
export class DevicePrescriptionComponent {
  constructor(private router: Router, public configService: ConfigService) {

  }
  continue() {
    this.router.navigateByUrl('design-model', { skipLocationChange: true })
  }
}
