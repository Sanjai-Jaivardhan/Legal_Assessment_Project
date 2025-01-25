import { Component,model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ScenarioChatbotComponent } from '../scenario-chatbot/scenario-chatbot.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface Tile {
  text: string;
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-scenario-assessment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule
  ],
  templateUrl: './scenario-assessment.component.html',
  styleUrls: ['./scenario-assessment.component.scss'] // Fixed typo here
})
export class ScenarioAssessmentComponent {
  constructor(public dialog: MatDialog) {}
  selected = model<Date | null>(null);
  
  tiles: Tile[] = [
    { text: 'Home', color: '#aed581', cols: 1, rows: 1 },
    { text: 'Court', color: '#81d4fa', cols: 2, rows: 1 },
    { text: 'Calendar', color: '#ffcc80', cols: 1, rows: 2 },
    { text: 'Judge', color: '#ffab91', cols: 2, rows: 2 },
    { text: 'Wet', color: '#80cbc4', cols: 1, rows: 2 },
    { text: 'Calendar', color: '#e6ee9c', cols: 1, rows: 3 },
    { text: 'Court', color: '#bcaaa4', cols: 3, rows: 1 }
  ];

  openChatbotDialog() {
    const dialogRef = this.dialog.open(ScenarioChatbotComponent, {
      width: '800px',
      height: '600px',
      data: { message: 'How can I help you today?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chatbot dialog closed', result);
    });
  }
  
  // Function to show the description when a judge profile is hovered
  showDescription(judgeNumber: number): void {
    const descriptionText: { [key: number]: string } = {
      1: 'Justice Arun Kumar Mishra: A prominent figure in constitutional law, Justice Mishra is known for his landmark judgments on fundamental rights and state governance issues.',
    2: 'Justice Indira Banerjee: With expertise in commercial and civil law, Justice Banerjee has presided over significant cases related to property disputes and corporate governance.',
    3: 'Justice N. V. Ramana: Specializing in criminal law, Justice Ramana has been instrumental in handling high-profile criminal cases, including corruption and organized crime.',
    
    };

    // Ensure the judgeNumber is valid before attempting to access the object
    const description = descriptionText[judgeNumber] || 'No description available.';
    
    // Update the description box content dynamically
    const descriptionElement = document.getElementById('description-box');
    if (descriptionElement) {
      descriptionElement.innerHTML = `<p>${description}</p>`;
    }
  }

  // Function to reset the description when hover ends
  hideDescription(): void {
    const descriptionElement = document.getElementById('description-box');
    if (descriptionElement) {
      descriptionElement.innerHTML = `<p>Hover over a judge profile to see the description here.</p>`;
    }
  }
  activeCircle: number | null = null;
  isHovered: boolean = false;

  showCircleDescription(circleId: number): void {
    this.activeCircle = this.activeCircle === circleId ? null : circleId; // Toggle description
  }

  hoverCard(): void {
    this.isHovered = true;
  }

  unhoverCard(): void {
    this.isHovered = false;
  }
}
