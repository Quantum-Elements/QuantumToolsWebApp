import { ConfigService } from './../../../../core/config.service';
import { GaussianPulse, GaussianSquaredPulse, NoPulse, SquaredPulse } from './../../../../shared/models/pulse.model';
import { GateType, PulseShape } from './../../../../shared/enums/enum';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gate } from '../../../../shared/models/gate.model';
import { erf } from 'mathjs'
@Component({
  selector: 'app-gate-setting-dialog',
  templateUrl: './gate-setting-dialog.component.html',
  styleUrl: './gate-setting-dialog.component.scss'
})
export class GateSettingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public gate: Gate, public dialogRef: MatDialogRef<GateSettingDialogComponent>, public configService: ConfigService) { }
  public prevGate: Gate;
  public pulseOptions = Object.values(PulseShape)
  ngOnInit() {
    this.calculateAmplitude('X')
    this.calculateAmplitude('Y')
    this.prevGate = this.gate.clone();
  }
  calculateAmplitude(axis) {
    function aera(d, s) {
      return (-d + Math.exp(d ** 2 / (8 * s ** 2)) * Math.sqrt(2 * Math.PI) * s * erf(d / (2 * s * Math.sqrt(2)))) / (-1 + Math.exp(d ** 2 / (8 * s ** 2)))
    }
    let drive = axis == 'X' ? this.gate.x_drive : this.gate.y_drive;
    if (!drive) {
      return
    }
    if (drive.shape == PulseShape.Gaussian) {
      const gaussianPulse = drive as GaussianPulse;
      gaussianPulse.amplitude = this.gate.theta * Math.PI / (2 * Math.PI * aera(this.gate.duration, gaussianPulse.sigma))
    } else if (drive.shape == PulseShape.Squared) {
      const squaredPulse = drive as SquaredPulse;
      squaredPulse.amplitude = this.gate.theta * Math.PI / (2 * Math.PI * this.gate.duration)
    } else if (drive.shape == PulseShape.GaussinSquared) {
      const gaussianSquaredPulse = drive as GaussianSquaredPulse;
      gaussianSquaredPulse.amplitude = this.gate.theta * Math.PI / (2 * Math.PI * aera(this.gate.duration - gaussianSquaredPulse.width, gaussianSquaredPulse.sigma))
    }
    drive.amplitude = Math.round(drive.amplitude * 1e4) / 1e4

  }
  getDescription() {
    if (this.gate.type == GateType.Rx) {
      return 'Single-qubit rotation about the X axis'
    } else if (this.gate.type == GateType.Ry) {
      return 'Single-qubit rotation about the Y axis'
    } else if (this.gate.type == GateType.Rz) {
      return 'Single-qubit rotation about the Z axis'
    } else if (this.gate.type == GateType.I) {
      return 'Identity Gate'
    } else {
      return 'A parametric 2-qubit Z-X interaction'
    }
  }
  getEquation() {
    return `assets/gates/${this.gate.type}-equation.png`
  }
  setPulseShape(event: any, axis) {
    let shape = event.target.value
    let drive;
    if (shape == 'None') {
      drive = new NoPulse(axis)
    } else if (shape == PulseShape.Gaussian) {
      drive = new GaussianPulse(axis)
    } else if (shape == PulseShape.GaussinSquared) {
      drive = new GaussianSquaredPulse(axis)
    } else if (shape == PulseShape.Squared) {
      drive = new SquaredPulse(axis)
    }
    if (axis == 'X') {
      this.gate.x_drive = drive
    } else {
      this.gate.y_drive = drive
    }
  }
  save() {
    this.dialogRef.close({ prevGate: this.prevGate, newGate: this.gate })
  }
}
