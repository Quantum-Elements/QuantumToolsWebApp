import { RotationalAxis, LindbladOperator } from './../../../../shared/enums/enum';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BathType } from '../../../../shared/enums/enum';
import { Bath, LindbladBath, OhmicBath, SpinFluctuatorBath } from '../../../../shared/models/bath.model';

@Component({
  selector: 'app-bath-dialog',
  templateUrl: './bath-dialog.component.html',
  styleUrl: './bath-dialog.component.scss'
})
export class BathDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public bath: Bath, public dialogRef: MatDialogRef<BathDialogComponent>) { }
  // public bath: any = new OhmicBath()
  public bathOptions = Object.values(BathType);
  public operatorOptions;
  ngOnInit() {
    if (!this.bath) {
      this.bath = new LindbladBath()
    }
    this.updateOperatorOptions()
  }
  updateOperatorOptions() {
    if (this.bath.type == BathType.Lindblad) {
      this.operatorOptions = Object.values(LindbladOperator)
    } else {
      this.operatorOptions = Object.values(RotationalAxis)
    }
  }
  setBathType(event: any) {
    let type = event.target.value
    if (type == BathType.Ohmic) {
      this.bath = new OhmicBath()
    } else if (type == BathType.Fluctuator) {
      this.bath = new SpinFluctuatorBath()
    } else if (type == BathType.Lindblad) {
      this.bath = new LindbladBath()
    }
    this.updateOperatorOptions()
  }
  addBath() {
    this.dialogRef.close(this.bath);
  }
}
