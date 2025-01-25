import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScenarioDescriptionComponent } from '../scenario-description/scenario-description.component';
import { DetailService } from '../detail.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../authservice.service';
import { LogoutPageComponent } from '../logout-page/logout-page.component';
import { isPlatformBrowser } from '@angular/common';

export interface Scenario_Details {
  scenario_id: string;
  tag: string;
  small_title: string;
  title: string;
  abstract: string;
  description: string;
  duration: string;
}

@Component({
  selector: 'app-scenariopages',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ScenarioDescriptionComponent, RouterModule,LogoutPageComponent],
  templateUrl: './scenariopages.component.html',
  styleUrls: ['./scenariopages.component.scss']
})
export class ScenariopagesComponent implements OnInit, OnDestroy {
  sdetails: any[] = [];
  private tokenCheckInterval: any;

  constructor(
    private detailservice: DetailService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initial check when the component loads
      this.checkToken();

      // Set up a polling mechanism to check the token status periodically
      // this.tokenCheckInterval = setInterval(() => {
      //   this.checkToken();
      // }, 1000); // Check every 1 second (adjust as needed)
    }

    // Fetch the scenario details
    this.detailservice.scenariodetails().subscribe((data: any) => {
      this.sdetails = data;
    });

    // Checking login status with authService
    this.authService.checkLoginStatus();

    console.log(this.sdetails[0].title);
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  }

  checkToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScenarioDescriptionComponent, {
      width: '1400px',
      height:'680px',
      data: { exampleData: 'This is passed data' } // Optional data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
