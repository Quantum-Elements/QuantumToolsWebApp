import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'custom-number-input',
  templateUrl: './custom-number-input.component.html',
  styleUrl: './custom-number-input.component.scss'
})
export class CustomNumberInputComponent {
  @Input() step: number = 0.01;
  @Input() exp: number | undefined = undefined;
  @Input() unit: string | undefined = undefined;
  @Input() value: number | null = null;
  @Input() min: number;
  @Input() max: number;
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(newValue): void {
    newValue = newValue < this.min ? this.min : newValue > this.max ? this.max : newValue
    this.value = parseFloat(newValue);
    this.valueChange.emit(this.value);
  }
}
