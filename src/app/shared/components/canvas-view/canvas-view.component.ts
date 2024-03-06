import { Coupling } from './../../models/coupling.model';
import { Qudit } from './../../models/qudit.model';
import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { ConfigService } from '../../../core/config.service';

@Component({
  selector: 'canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrl: './canvas-view.component.scss'
})
export class CanvasViewComponent {
  @Input() selectedQudit!: Qudit;
  @Input() couplingMode: boolean = false;
  @Input() selectedQuditToCouple!: Qudit[];
  @Output() quditSelected = new EventEmitter<Qudit>();
  @Output() couplingSelected = new EventEmitter<Coupling>();

  // @ViewChildren(QuditComponent) qudits: QueryList<QuditComponent>;

  constructor(public configService: ConfigService) { }

  updateQuditPosition(qudit: Qudit, event: any): void {
    // Update the qudit position based on drag end event
    qudit.position = { x: event.source.getFreeDragPosition().x + 38, y: event.source.getFreeDragPosition().y + 38 };
  }
  // ngAfterViewInit() {
  //   this.qudits.forEach(qudit => {
  //     let position = qudit.qudit.position;
  //     if (position.x > 38 || position.y > 38) {
  //       this.renderer.setStyle(qudit.elementRef.nativeElement, 'transform', `translate3d(${position.x - 38}px, ${position.y - 38}px, 0px)`)
  //     }
  //   });
  // }
}
