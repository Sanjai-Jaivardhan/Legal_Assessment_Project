import { Component } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-end-instruction',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule, CommonModule],
  templateUrl: './end-instruction.component.html',
  styleUrl: './end-instruction.component.scss'
})
export class EndInstructionComponent {
  constructor(private dialogRef: MatDialogRef<EndInstructionComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
