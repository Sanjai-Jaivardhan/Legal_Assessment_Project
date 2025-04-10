import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-lawaccess',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,CommonModule],
  templateUrl: './lawaccess.component.html',
  styleUrl: './lawaccess.component.scss'
})
export class LawaccessComponent {


  lawSections = [
    {
      title: '📂 Case Filing',
      description: 'Upload case-related documents like petitions, suits, or appeals.',
      inputType: 'file',
      buttonText: 'Upload'
    },
    {
      title: '📨 Summons & Notices',
      description: 'Send summons or notices directly to individuals involved.',
      inputType: 'file',
      buttonText: 'Send'
    },
    {
      title: '📜 Certified Copies',
      description: 'Request official certified copies of court documents.',
      inputType: 'textarea',
      placeholder: 'Mention document type or details',
      buttonText: 'Request'
    },
    {
      title: '🧾 Procedural Help',
      description: 'Get help with how to file or proceed in court.',
      inputType: 'textarea',
      placeholder: 'Type your question or concern',
      buttonText: 'Submit'
    },
    {
      title: '🕊️ Lok Adalat',
      description: 'Select type of case for alternative resolution.',
      inputType: 'select',
      options: ['Select Case Type', 'Family', 'Property', 'Loan', 'Civil'],
      buttonText: 'Resolve'
    }
  ];

  performAction(sectionTitle: string) {
    alert(`Action triggered for: ${sectionTitle}`);
  }
}
