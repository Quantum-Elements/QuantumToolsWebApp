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
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(newValue): void {
    this.value = parseFloat(newValue);
    this.valueChange.emit(this.value);
  }
}
