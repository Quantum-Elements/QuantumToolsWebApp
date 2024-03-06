import { Coupling } from './../../models/coupling.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'coupling',
  templateUrl: './coupling.component.html',
  styleUrl: './coupling.component.scss'
})
export class CouplingComponent {
  @Input() coupling: Coupling;

  get lineStyles() {
    let startPosition, endPosition;
    if (this.coupling.qudit1.position.x > this.coupling.qudit2.position.x) {
      startPosition = this.coupling.qudit2.position
      endPosition = this.coupling.qudit1.position
    } else {
      startPosition = this.coupling.qudit1.position
      endPosition = this.coupling.qudit2.position
    }
    const length = Math.sqrt((endPosition.x - startPosition.x) ** 2 + (endPosition.y - startPosition.y) ** 2);
    return {
      position: 'absolute',
      left: `${startPosition.x}px`,
      top: `${startPosition.y}px`,
      width: `${length}px`,
      height: '3px',
      backgroundColor: 'white',
      transform: `rotate(${Math.atan2(endPosition.y - startPosition.y, endPosition.x - startPosition.x)}rad)`,
      transformOrigin: '0px 0px'
    };
  }
}
