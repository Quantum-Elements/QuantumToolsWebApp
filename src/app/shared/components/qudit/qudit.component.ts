import { Qudit } from './../../models/qudit.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'qudit',
  templateUrl: './qudit.component.html',
  styleUrl: './qudit.component.scss'
})
export class QuditComponent {
  @Input() qudit: Qudit;
}
