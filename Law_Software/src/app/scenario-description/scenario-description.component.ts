import { Component, Inject } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-scenario-description',
  standalone: true,
  imports: [MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './scenario-description.component.html',
  styleUrls: ['./scenario-description.component.scss']
})
export class ScenarioDescriptionComponent {
  panelOpenState = false;
}
