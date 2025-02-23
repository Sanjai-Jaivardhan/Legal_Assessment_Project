import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ScenariopagesComponent } from './scenariopages/scenariopages.component';
import { ScenarioDescriptionComponent } from './scenario-description/scenario-description.component';
import { ScenarioAssessmentComponent } from './scenario-assessment/scenario-assessment.component';

import { AssessJudicialPageComponent } from './assess-judicial-page/assess-judicial-page.component';
import { AssessAdministrativePageComponent } from './assess-administrative-page/assess-administrative-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ClerkComponent } from './clerk/clerk.component';
import { DivOfCourtComponent } from './div-of-court/div-of-court.component';
import { CourtfilingsComponent } from './courtfilings/courtfilings.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'scenarios', component:ScenariopagesComponent},
  { path: 'scenarioDescription', component:ScenarioDescriptionComponent},
  { path: 'assessment', component:ScenarioAssessmentComponent},
  { path:'judicial',component:AssessJudicialPageComponent},
  { path:'administrative',component:AssessAdministrativePageComponent},
  { path:'dashboard',component:DashboardPageComponent},
  { path:'clerk',component:ClerkComponent},
  { path:'divisions',component:DivOfCourtComponent},
  { path:'courtfilings',component:CourtfilingsComponent},
  { path: '**',redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

