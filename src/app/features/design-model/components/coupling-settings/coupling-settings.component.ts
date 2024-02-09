import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfigService } from '../../../../core/config.service';
import { RotationalAxis } from '../../../../shared/enums/enum';
import { Coupling } from '../../../../shared/models/coupling.model';

@Component({
  selector: 'coupling-settings',
  templateUrl: './coupling-settings.component.html',
  styleUrl: './coupling-settings.component.scss'
})
export class CouplingSettingsComponent {
  @Input() selectedCoupling: Coupling | undefined = undefined;
  @Output() selectedCouplingChange = new EventEmitter<Coupling>();
  constructor(public configService: ConfigService) {
    this.axisOptions = Object.values(RotationalAxis)
  }

  public axisOptions: RotationalAxis[];

  deleteCoupling() {
    this.configService.removeCoupling(this.selectedCoupling)
    this.selectedCoupling = undefined;
    this.selectedCouplingChange.emit(this.selectedCoupling)
  }
}
