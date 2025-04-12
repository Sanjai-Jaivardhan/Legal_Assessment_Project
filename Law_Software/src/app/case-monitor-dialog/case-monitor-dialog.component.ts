import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-case-monitor-dialog',
  standalone: true,
  imports: [ MatIconModule, MatProgressSpinnerModule],
  templateUrl: './case-monitor-dialog.component.html',
  styleUrl: './case-monitor-dialog.component.scss'
})
export class CaseMonitorDialogComponent {

}
