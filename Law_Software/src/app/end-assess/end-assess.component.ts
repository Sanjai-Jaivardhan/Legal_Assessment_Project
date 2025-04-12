import { Component } from '@angular/core';
import { DetailService } from '../detail.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EndInstructionComponent } from '../end-instruction/end-instruction.component';
@Component({
  selector: 'app-end-assess',
  standalone: true,
  imports: [],
  templateUrl: './end-assess.component.html',
  styleUrl: './end-assess.component.scss'
})
export class EndAssessComponent {

  constructor(private dialog:MatDialog,private detailService: DetailService, private router: Router) {}

  endtest() {
    const endTestData = {
      track_id: 'T123',  // Replace with actual values
      track_time: new Date().toLocaleTimeString(),
      track_date: new Date().toISOString().split('T')[0],
      test_id: 'TEST_01', // Replace with actual test ID
      test_score: 85, // Example score
      test_feedback: 'Good performance' // Example feedback
    };
    this.openEndTestDialog();
    this.detailService.getFinalResultPathBased().subscribe({
      next: (res) => console.log('Final result:', res),
      error: (err) => console.error('Error getting final result:', err)
    });
    
    this.router.navigate(['/dashboard']);
    // this.detailService.endTest(endTestData).subscribe(
    //   (response) => {
    //     console.log('End test data submitted:', response);
    //     alert('Test Ended Successfully');
    //     this.router.navigate(['/dashboard'], { replaceUrl: true }).then(() => {
    //       window.history.pushState(null, '', '/scenarios'); // Prevent back navigation
    //     });
        
    //   },
    //   (error) => {
    //     console.error('Error submitting end test data:', error);
    //   }
    // );
  }
  openEndTestDialog(): void {
    const dialogRef = this.dialog.open(EndInstructionComponent, {
      width: '400px',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(() => {
      
      console.log('Dialog closed');
      // navigate to results page or dashboard if needed
    });
  }
}
