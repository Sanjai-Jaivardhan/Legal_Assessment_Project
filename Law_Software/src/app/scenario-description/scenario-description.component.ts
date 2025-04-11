import { Component, Inject } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { timestamp } from 'rxjs';
import { DetailService } from '../detail.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructionPageComponent } from '../instruction-page/instruction-page.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-scenario-description',
  standalone: true,
  imports: [MatExpansionModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './scenario-description.component.html',
  styleUrls: ['./scenario-description.component.scss']
})
export class ScenarioDescriptionComponent {
  panelOpenState = false;
  title='An unexpeccted chaos';
  allDetails:any
  scenarioId='S1_id100'
  constructor(
    private detailService:DetailService,
    private router: Router,
    private dialogRef: MatDialogRef<ScenarioDescriptionComponent>,
    private dialog: MatDialog,
  ){

  }

  ngOnInit():void{
    this.detailService.allDetails(this.scenarioId).subscribe((data:any)=>{
      this.allDetails=data;
      console.log(this.allDetails)
    })
  }
  
  onStartScenario(event: Event): void {
    this.dialog.open(InstructionPageComponent, {
      width: '1000px',
      disableClose: true
    });
    const buttonId = (event.currentTarget as HTMLElement).id;
    const eventTime = Date.now() - performance.now() + event.timeStamp;
    this.dialogRef.close();
    this.router.navigate(['/assessment']);
    console.log('Button ID:', buttonId);
    console.log("Event Type:",new Date(event.timeStamp))
    console.log('Correct Event Time:', new Date(eventTime).toString());
  }
  
}
