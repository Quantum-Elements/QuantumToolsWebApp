import { ConfigService } from './../../../../core/config.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'gate-type',
  templateUrl: './gate-type.component.html',
  styleUrl: './gate-type.component.scss'
})
export class GateTypeComponent {
  @Input() selectedQudit
  constructor(public configService: ConfigService) { }
}
