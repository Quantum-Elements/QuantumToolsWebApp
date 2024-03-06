import { CRGate } from './../../../../shared/models/gate.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GateType } from '../../../../shared/enums/enum';
import { Gate } from '../../../../shared/models/gate.model';

@Component({
  selector: 'gate',
  templateUrl: './gate.component.html',
  styleUrl: './gate.component.scss'
})
export class GateComponent {
  @Input() gate: Gate;
  @Input() isRemovable: boolean = true;
  @Output() settingClicked = new EventEmitter();
  @Output() removeClicked = new EventEmitter();

  showSub() {
    return this.gate.type == GateType.CR && (this.gate as CRGate).qudit_b
  }
}
