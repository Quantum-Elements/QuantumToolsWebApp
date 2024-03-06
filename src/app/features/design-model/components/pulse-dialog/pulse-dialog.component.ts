import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pulse-dialog',
  templateUrl: './pulse-dialog.component.html',
  styleUrl: './pulse-dialog.component.scss'
})
export class PulseDialogComponent {
  constructor(public dialogRef: MatDialogRef<PulseDialogComponent>) { }
  @Input() pulse;
  public xDriveSet = false;
  public yDriveSet = false;
}
