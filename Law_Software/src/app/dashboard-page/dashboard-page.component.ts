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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { LogoutPageComponent } from '../logout-page/logout-page.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { DetailService } from '../detail.service';

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
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [  ]
})
export class DashboardPageComponent {
  displayedColumns: string[] = [
    'test_id',
    'test_name',
    'test_path',
    'test_technical_score',
    'test_path_reward',
    'overall_score'
  ];
  
  testData = [
    {
      test_id: 1,
      test_name: 'Logic Test',
      test_path: { type: 'Coding', difficulty: 'Hard' },
      test_technical_score: 85,
      test_path_reward: 20,
      overall_score: 90
    },
    {
      test_id: 2,
      test_name: 'Skill Assessment',
      test_path: { type: 'MCQ', difficulty: 'Medium' },
      test_technical_score: 75,
      test_path_reward: 15,
      overall_score: 80
    }
  ];

  finalResults: any[] = [];

  constructor(private detailService: DetailService) {}

  ngOnInit(): void {
    this.detailService.getFinalResults().subscribe(
      res => {
        if (res.success) {
          this.finalResults = res.data;
        }
      },
      err => {
        console.error('Error loading final results:', err);
      }
    );
  
  }
  
}
