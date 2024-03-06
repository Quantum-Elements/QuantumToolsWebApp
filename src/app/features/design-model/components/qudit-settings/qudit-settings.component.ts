import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from '../../../../core/config.service';
import { Qudit } from '../../../../shared/models/qudit.model';
import { BathDialogComponent } from '../bath-dialog/bath-dialog.component';

@Component({
  selector: 'qudit-settings',
  templateUrl: './qudit-settings.component.html',
  styleUrl: './qudit-settings.component.scss'
})
export class QuditSettingsComponent {
  @Input() selectedQudit: Qudit | undefined;
  @Output() selectedQuditChange = new EventEmitter();
  constructor(public configService: ConfigService, public dialog: MatDialog) { }
  openBathDialog(bath?) {
    const dialogRef = this.dialog.open(BathDialogComponent, { width: '500px', data: bath })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        (this.selectedQudit as Qudit).bath.push(result)
      }
    })
  }
  deleteQudit() {
    this.configService.removeQudit(this.selectedQudit)
    this.selectedQudit = undefined;
    this.selectedQuditChange.emit(this.selectedQudit)
  }
}
