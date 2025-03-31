import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScenarioDescriptionComponent } from './scenario-description/scenario-description.component';
import { ScenariopagesComponent } from './scenariopages/scenariopages.component';
import { ScenarioChatbotComponent } from './scenario-chatbot/scenario-chatbot.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ScenarioAssessmentComponent } from './scenario-assessment/scenario-assessment.component';

import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { EndAssessComponent } from './end-assess/end-assess.component';
import { ClerkComponent } from './clerk/clerk.component';
import { access } from 'fs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AssessAdministrativePageComponent } from './assess-administrative-page/assess-administrative-page.component';
import { CourtfilingsComponent } from './courtfilings/courtfilings.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginPageComponent,
    LogoutPageComponent,
    RegisterPageComponent,
    ScenarioChatbotComponent,
    ScenarioDescriptionComponent,
    ScenarioAssessmentComponent,
    ScenariopagesComponent,
    ClerkComponent,
    MatCardModule,
    NgxChartsModule,
    DashboardPageComponent,
    MatDatepickerModule,
    EndAssessComponent,
    AssessAdministrativePageComponent,
    CourtfilingsComponent
  ],
  providers: [provideNativeDateAdapter()], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Law_Software';
  panelOpenState = false;
}
