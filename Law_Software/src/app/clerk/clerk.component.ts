import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgIf, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DetailService } from '../detail.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clerk',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    FormsModule,
    HttpClientModule,
    MatCard,
    MatButton
  ],
  templateUrl: './clerk.component.html',
  styleUrls: ['./clerk.component.scss']
})
export class ClerkComponent {
  selectedFile: File | null = null;

  textInputMap: { [key: number]: string } = {};
  numberInputMap: { [key: number]: number } = {};
  dateInputMap: { [key: number]: string } = {};
  textareaInputMap: { [key: number]: string } = {};
  selectedOptionMap: { [key: number]: string } = {};

  constructor(private location: Location, private clerkService: DetailService) {}

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

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleAction(index: number): void {
    const payload: any = {};

    switch (index) {
      case 0:
        payload.filing_doc = this.selectedFile?.name;
        break;
      case 1:
        payload.case_num = this.textInputMap[index];
        break;
      case 2:
        payload.summons_doc = this.selectedFile?.name;
        break;
      case 3:
        payload.order_id = this.textInputMap[index];
        break;
      case 4:
        payload.payment_amt = this.numberInputMap[index];
        break;
      case 5:
        payload.order_details = this.textareaInputMap[index];
        break;
      case 6:
        payload.dispute_type = this.selectedOptionMap[index];
        break;
      case 7:
        payload.query_text = this.textInputMap[index];
        break;
      case 8:
        payload.training_date = this.dateInputMap[index];
        break;
      default:
        return;
    }

    this.clerkService.submitClerkDetails(payload).subscribe({
      next: (res) => {
        alert('Details submitted successfully!');
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert('Submission failed!');
      }
    });
  }
}
