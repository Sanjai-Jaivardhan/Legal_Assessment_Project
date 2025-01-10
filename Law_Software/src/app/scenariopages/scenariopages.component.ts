import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDescriptionComponent } from '../scenario-description/scenario-description.component';
import { DetailService } from '../detail.service';
import { CommonModule } from '@angular/common';




export interface Scenario_Details{
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
  imports: [ CommonModule,ScenarioDescriptionComponent],
  templateUrl: './scenariopages.component.html',
  styleUrls: ['./scenariopages.component.scss']
})
export class ScenariopagesComponent {
  sdetails:any
  constructor(private detailservice:DetailService, public dialog: MatDialog){

  }

  ngOnInit():void{
    this.detailservice.scenariodetails().subscribe((data:any)=>{
      this.sdetails=data
      console.log(this.sdetails)
    })
  }

  

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ScenarioDescriptionComponent, {
  //     width: '300px',
  //     data: { exampleData: 'This is passed data' } // Optional data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialog closed with result:', result);
  //   });
  // }

  
  // cases = [
  //   {
  //     title: 'Civil Case: Property Dispute',
  //     description: 'A property dispute has arisen between two neighbors over the boundary line of their properties. The plaintiff claims that the defendant has encroached on their land.',
  //     image: 'https://storage.googleapis.com/a1aa/image/XYEFnIFeEEWYAiGjWNM6bFEcYaU3ckJZRuT8pL50Il98IseTA.jpg'
  //   },
  //   {
  //     title: 'Corporate Case: Contract Breach',
  //     description: 'A major corporation is suing a supplier for breach of contract. The corporation claims that the supplier failed to deliver goods as per the agreed schedule.',
  //     image: 'https://storage.googleapis.com/a1aa/image/AN1UfoR8KYRmKK22r54e0rwx3L1Q8s94zc5CVafvp0vvjw6nA.jpg'
  //   },
  //   {
  //     title: 'Criminal Case: Theft',
  //     description: 'A small business owner has accused an employee of theft. The owner claims that the employee was caught on camera stealing merchandise.',
  //     image: 'https://storage.googleapis.com/a1aa/image/UCfzgfjP2CpYUUdr3ToWtY6achKuRJfU2OT56RX3YA1tjw6nA.jpg'
  //   },
  //   {
  //     title: 'Civil Case: Property Dispute',
  //     description: 'A property dispute has arisen between two neighbors over the boundary line of their properties. The plaintiff claims that the defendant has encroached on their land.',
  //     image: 'https://storage.googleapis.com/a1aa/image/XYEFnIFeEEWYAiGjWNM6bFEcYaU3ckJZRuT8pL50Il98IseTA.jpg'
  //   },
  //   {
  //     title: 'Corporate Case: Contract Breach',
  //     description: 'A major corporation is suing a supplier for breach of contract. The corporation claims that the supplier failed to deliver goods as per the agreed schedule.',
  //     image: 'https://storage.googleapis.com/a1aa/image/AN1UfoR8KYRmKK22r54e0rwx3L1Q8s94zc5CVafvp0vvjw6nA.jpg'
  //   },
  //   {
  //     title: 'Criminal Case: Theft',
  //     description: 'A small business owner has accused an employee of theft. The owner claims that the employee was caught on camera stealing merchandise.',
  //     image: 'https://storage.googleapis.com/a1aa/image/UCfzgfjP2CpYUUdr3ToWtY6achKuRJfU2OT56RX3YA1tjw6nA.jpg'
  //   }
  // ];




}
