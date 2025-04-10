import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
@Component({
  selector: 'app-clerk',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.scss']
})
export class ClerkComponent {
  selectedFile: File | null = null;
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
  

  
    courtSections = [
      {
        title: '1. Case Filing & Documentation',
        description: 'Advocates submit petitions, suits, and appeals with proper verification.',
        inputType: 'file',
        buttonText: 'Submit'
      },
      {
        title: '2. Case Status & Scheduling',
        description: 'Advocates track case progress and check hearing schedules.',
        inputType: 'text',
        placeholder: 'Enter Case Number',
        buttonText: 'Check Status'
      },
      {
        title: '3. Summons & Notices',
        description: 'Issuing legal notices, summons, and warrants to parties involved.',
        inputType: 'file',
        buttonText: 'Submit'
      },
      {
        title: '4. Certified Copies & Judicial Records',
        description: 'Advocates request copies of court orders and past judgments.',
        inputType: 'text',
        placeholder: 'Enter Case Order ID',
        buttonText: 'Request Copy'
      },
      {
        title: '5. Payment & Court Fees Processing',
        description: 'Processing court fees, fine receipts, and legal payments.',
        inputType: 'number',
        placeholder: 'Enter Payment Amount',
        buttonText: 'Proceed to Payment'
      },
      {
        title: '6. Execution of Court Orders',
        description: 'Issuing orders for financial settlements, bail, and property disputes.',
        inputType: 'textarea',
        placeholder: 'Enter Order Details',
        buttonText: 'Submit'
      },
      {
        title: '7. Assistance in Lok Adalat & ADR',
        description: 'Moving cases to alternative dispute resolution mechanisms.',
        inputType: 'select',
        options: ['Choose Dispute Type', 'Financial Settlement', 'Property Dispute', 'Family Dispute'],
        buttonText: 'View'
      },
      {
        title: '8. Compliance & Procedural Guidance',
        description: 'Clerk guidance for filing accuracy and procedural compliance.',
        inputType: 'text',
        placeholder: 'Enter Your Query',
        buttonText: 'Submit Query'
      },
      {
        title: '9. Advocate Training & Knowledge Support',
        description: 'Clerk assists junior advocates in learning court procedures.',
        inputType: 'date',
        buttonText: 'Request Training'
      }
    ];
  
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }
  
    uploadFile() {
      if (this.selectedFile) {
        console.log('Uploading:', this.selectedFile.name);
        alert('File uploaded successfully!');
      } else {
        alert('Action completed!');
      }
    }
  }

