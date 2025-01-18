import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScenarioDescriptionComponent } from './scenario-description/scenario-description.component';
import { ScenariopagesComponent } from './scenariopages/scenariopages.component';

import { ScenarioChatbotComponent } from './scenario-chatbot/scenario-chatbot.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ScenarioAssessmentComponent } from './scenario-assessment/scenario-assessment.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginPageComponent,
    LogoutPageComponent,
    RegisterPageComponent,
    ScenarioChatbotComponent,
    ScenarioDescriptionComponent,
ScenarioAssessmentComponent,
    ScenariopagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Law_Software';
panelOpenState = false;
}
