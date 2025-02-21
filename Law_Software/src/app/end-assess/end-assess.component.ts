import { Component } from '@angular/core';
import { DetailService } from '../detail.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-end-assess',
  standalone: true,
  imports: [],
  templateUrl: './end-assess.component.html',
  styleUrl: './end-assess.component.scss'
})
export class EndAssessComponent {

  constructor(private detailService: DetailService, private router: Router) {}

  endtest() {
    const endTestData = {
      track_id: 'T123',  // Replace with actual values
      track_time: new Date().toLocaleTimeString(),
      track_date: new Date().toISOString().split('T')[0],
      test_id: 'TEST_01', // Replace with actual test ID
      test_score: 85, // Example score
      test_feedback: 'Good performance' // Example feedback
    };
  
    this.detailService.endTest(endTestData).subscribe(
      (response) => {
        console.log('End test data submitted:', response);
        alert('Test Ended Successfully');
        this.router.navigate(['/scenarios'], { replaceUrl: true }).then(() => {
          window.history.pushState(null, '', '/scenario'); // Prevent back navigation
        });
        
      },
      (error) => {
        console.error('Error submitting end test data:', error);
      }
    );
  }
  
}
