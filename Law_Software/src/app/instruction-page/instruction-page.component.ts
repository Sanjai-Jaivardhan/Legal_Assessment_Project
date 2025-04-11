import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-instruction-page',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './instruction-page.component.html',
  styleUrl: './instruction-page.component.scss'
})
export class InstructionPageComponent {
  countdown: number | null = null;
  isCounting: boolean = false;

  constructor(private dialogRef: MatDialogRef<InstructionPageComponent>) {}

  startCountdown(): void {
    if (this.isCounting) return; // avoid double triggers

    this.isCounting = true;
    this.countdown = 3;

    const interval = setInterval(() => {
      if (this.countdown && this.countdown > 1) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.dialogRef.close(); // Close after countdown finishes
      }
    }, 1000);
  }
}
