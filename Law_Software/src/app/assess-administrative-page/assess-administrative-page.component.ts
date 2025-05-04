import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assess-administrative-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './assess-administrative-page.component.html',
  styleUrl: './assess-administrative-page.component.scss'
})
export class AssessAdministrativePageComponent {
  sections = [
    {
      title: 'Regulation & Compliance',
      description: 'Ensures government agencies follow laws and regulations, maintaining legal fairness in administration.',
      points: 10
    },
    {
      title: 'Public Policy Implementation',
      description: 'Oversees policy enforcement and ensures that government programs operate within legal frameworks.',
      points: 15
    },
    {
      title: 'Judicial Review & Appeals',
      description: 'Reviews administrative decisions and processes appeals to ensure lawful governance.',
      points: 20
    },
    {
      title: 'Employment & Labor Law',
      description: 'Handles public sector employment disputes, ensuring fair hiring and workplace policies.',
      points: 10
    },
    {
      title: 'Data Protection & Privacy',
      description: 'Monitors legal standards for handling government and public data securely and transparently.',
      points: 15
    }
  ];
  
  totalPoints = 0;
  
  onCardClick(points: number) {
    this.totalPoints += points;
  }
  goBack(): void {
    window.history.back();
  }
}





