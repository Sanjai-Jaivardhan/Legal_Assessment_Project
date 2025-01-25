
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ScenarioChatbotComponent } from '../scenario-chatbot/scenario-chatbot.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DetailService } from '../detail.service';
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
  imports: [MatCardModule,
      MatInputModule,
      MatDatepickerModule,
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatDialogModule,
      FormsModule,
    MatGridListModule],
  templateUrl: './scenario-assessment.component.html',
  styleUrl: './scenario-assessment.component.scss'
})
export class ScenarioAssessmentComponent {
  constructor(public dialog: MatDialog,private trackService:DetailService) {}

  tiles: Tile[] = [
    { text: 'Home', color: '#aed581', cols: 1, rows: 1 },
    { text: 'Court', color: '#81d4fa', cols: 2, rows: 1 },
    { text: 'Calender', color: '#ffcc80', cols: 1, rows: 2 },
    { text: 'Judge', color: '#ffab91', cols: 2, rows: 2 },
    { text: 'Wet', color: '#80cbc4', cols: 1, rows: 2 },
    { text: 'Calendar', color: '#e6ee9c', cols: 1, rows: 3 },
    { text: 'Court', color: '#bcaaa4', cols: 3, rows: 1 }, 
  ];

  courtDetails:any[]=[]

  ngOnInit(){
    this.trackService.courtDetails().subscribe((data)=>{
      this.courtDetails=data
    })
  }
  addTrack(trackData: {
    track_id: string;
    track_time: string;
    track_date: string;
    chat_button_id: string;
    chat_id: string;
    chat_values: string;
  }): void {
    this.callServiceToAddTrack(trackData);
  }

  private callServiceToAddTrack(trackData: {
    track_id: string;
    track_time: string;
    track_date: string;
    chat_button_id: string;
    chat_id: string;
    chat_values: string;
  }): void {
    this.trackService.sendTrackData(trackData).subscribe(
      (response) => {
        console.log('Tracking data added successfully:', response);
      },
      (error) => {
        console.error('Error while adding tracking data:', error);
      }
    );
  }
 
 
  openChatbotDialog(event: Event): void {
    const buttonId = (event.currentTarget as HTMLElement).id;
    const eventTime = Date.now() - performance.now() + event.timeStamp;

    const trackData = {
      track_id: '100', // Example static ID
      track_time: new Date(eventTime).toISOString(),
      track_date: new Date(eventTime).toISOString().split('T')[0],
      chat_button_id: buttonId,
      chat_id: 'chat_456',
      chat_values: 'Chatbot opened',
    };

    this.addTrack(trackData);

    const dialogRef = this.dialog.open(ScenarioChatbotComponent, {
      width: '800px',
      height: '600px',
      data: { message: 'How can I help you today?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Chatbot dialog closed', result);
    });
  }

  

  onDetailCollection(event: Event): void {
    const buttonId = (event.currentTarget as HTMLElement).id;
    const eventTime = Date.now() - performance.now() + event.timeStamp;
    console.log('Button ID:', buttonId);
    console.log("Event Type:",new Date(event.timeStamp))
    console.log('Correct Event Time:', new Date(eventTime).toString());
  }

  
}
