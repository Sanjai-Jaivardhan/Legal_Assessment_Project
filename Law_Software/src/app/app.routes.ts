import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ScenariopagesComponent } from './scenariopages/scenariopages.component';
import { ScenarioDescriptionComponent } from './scenario-description/scenario-description.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'scenarios', component:ScenariopagesComponent},
  { path: 'scenarioDescription', component:ScenarioDescriptionComponent},
  { path: '**',redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

