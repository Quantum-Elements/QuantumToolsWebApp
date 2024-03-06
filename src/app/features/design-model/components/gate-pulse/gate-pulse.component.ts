import { GaussianPulse, GaussianSquaredPulse, SquaredPulse } from './../../../../shared/models/pulse.model';
import { Component, Input } from '@angular/core';
import { ConfigService } from '../../../../core/config.service';
import { PulseShape } from '../../../../shared/enums/enum';

@Component({
  selector: 'gate-pulse',
  templateUrl: './gate-pulse.component.html',
  styleUrl: './gate-pulse.component.scss'
})
export class GatePulseComponent {
  @Input() selectedQudit

  public pulseOptions: PulseShape[];
  constructor(public configService: ConfigService) {
    this.pulseOptions = Object.values(PulseShape)
  }
  pulseShapeChanged(e: any) {
    let shape = e.target.value
    if (shape == PulseShape.Gaussian) {
      this.selectedQudit.pulses[0].x_drive = new GaussianPulse('X')
    } else if (shape == PulseShape.Squared) {
      this.selectedQudit.pulses[0].x_drive = new SquaredPulse('X')
    } else if (shape == PulseShape.GaussinSquared) {
      this.selectedQudit.pulses[0].x_drive = new GaussianSquaredPulse('X')
    }
  }
}
