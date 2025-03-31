import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { LogoutPageComponent } from '../logout-page/logout-page.component';
import { AuthService } from '../authservice.service';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    NgxChartsModule,
    
    LogoutPageComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  displayedColumns: string[] = ['sno', 'title', 'skill', 'completion', 'threshold'];
 
  cases = [
    { sno: 1, title: 'Case 1: Property Dispute', skill: 'Legal Analysis', completion: '80%', threshold: '85%' },
    { sno: 2, title: 'Case 2: Contract Violation', skill: 'Contract Law', completion: '75%', threshold: '80%' },
    { sno: 3, title: 'Case 3: Intellectual Property Theft', skill: 'IP Law', completion: '90%', threshold: '95%' },
    { sno: 4, title: 'Case 1: Property Dispute', skill: 'Legal Analysis', completion: '80%', threshold: '85%' },
    { sno: 5, title: 'Case 2: Contract Violation', skill: 'Contract Law', completion: '75%', threshold: '80%' },
    { sno: 6, title: 'Case 3: Intellectual Property Theft', skill: 'IP Law', completion: '90%', threshold: '95%' }

  ];
  caseTrends = [
    { name: 'Jan', value: 10 },
    { name: 'Feb', value: 15 },
    { name: 'Mar', value: 20 },
    { name: 'Apr', value: 18 },
    { name: 'May', value: 25 },
    { name: 'Jun', value: 30 }
  ];

  // Average Case Resolution Time (Gauge Chart)
  avgResolutionTime = [
    { name: 'Resolved', value: 70 },
    { name: 'Pending', value: 30 }
  ];

  // Compliance Status Breakdown (Pie Chart)
  complianceStatus = [
    { name: 'Compliant', value: 80 },
    { name: 'Non-Compliant', value: 20 }
  ];

  // Cases Nearing Deadline Alert
  casesNearingDeadline = [
    { caseId: 'Case 101', daysLeft: 3, urgency: 'High' },
    { caseId: 'Case 102', daysLeft: 7, urgency: 'Medium' },
    { caseId: 'Case 103', daysLeft: 10, urgency: 'Low' }
  ];

  // // ✅ Add Chart Data
  // complianceData = [
  //   { name: 'Passed', value: 60 },
  //   { name: 'Failed', value: 40 }
  // ];
  
  // caseData = [
  //   { name: 'Resolved', value: 30 },
  //   { name: 'Pending', value: 20 },
  //   { name: 'Ongoing', value: 50 }
  // ];
  

}

  // caseData = new MatTableDataSource([
  //   { sno: 1, title: 'Case 1: Property Dispute', skill: 'Legal Analysis', completion: '80%', threshold: '85%' },
  //   { sno: 2, title: 'Case 2: Contract Violation', skill: 'Contract Law', completion: '75%', threshold: '80%' },
  //   { sno: 3, title: 'Case 3: Intellectual Property Theft', skill: 'IP Law', completion: '90%', threshold: '95%' }
  // ]);

  // assessmentData = [
  //   { name: 'Completed', value: 8 },
  //   { name: 'Pending', value: 4 }
  // ];

  // menuItems = [
  //   { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
  //   { label: 'Assessments', icon: 'assignment', link: '/assessments' },
  //   { label: 'Cases', icon: 'gavel', link: '/cases' },
  //   { label: 'Results', icon: 'fact_check', link: '/results' },
  //   { label: 'Settings', icon: 'settings', link: '/settings' }
  // ];
  // courseCompletionData = new MatTableDataSource([
  //   { sno: 1, title: 'Case A', skill: 'Legal Research', completion: '85%', threshold: '90%' },
  //   { sno: 2, title: 'Case B', skill: 'Contract Analysis', completion: '78%', threshold: '85%' },
  //   { sno: 3, title: 'Case C', skill: 'Civil Law', completion: '92%', threshold: '95%' },
  //   { sno: 4, title: 'Case D', skill: 'Corporate Law', completion: '76%', threshold: '80%' }
  // ]);

  // // Overall track completion percentage
  // overallCompletion = 74;

