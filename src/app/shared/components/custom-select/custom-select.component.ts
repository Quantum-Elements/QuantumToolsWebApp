import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss'
})
export class CustomSelectComponent {
  @Input() options: any[] | undefined;
  @Input() selectedValue: any;
  @Output() selectedValueChange = new EventEmitter<any>();
  ngOnInit() {
    console.log(this.options, this.selectedValue)
    if (!this.selectedValue && this.options && this.options.length > 0) {
      setTimeout(() => {
        this.selectedValue = this.options[0];
        this.selectedValueChange.emit(this.selectedValue);
      });
    }
  }
  ngOnChanges(changes: any): void {
    console.log(changes)
    if ('selectedValue' in changes && changes.selectedValue.currentValue !== this.selectedValue) {
      this.selectedValue = changes.selectedValue.currentValue;
    }
  }
  onSelect(option: any): void {
    this.selectedValue = option;
    this.selectedValueChange.emit(option);
  }
}
