import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DetailService } from '../detail.service';



@Component({
  selector: 'app-clientdocument',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatSidenavModule,
  ],
  templateUrl: './clientdocument.component.html',
  styleUrl: './clientdocument.component.scss'
})
export class ClientdocumentComponent {
  showAssessment = false;

  constructor(private location: Location ,private router: Router,private clientDocumentService:DetailService) {}

  goBack() {
    this.router.navigate(['/assessment']);
  }
  documentTypes = [
    'Contract',
    'Agreement',
    'Non-Disclosure Agreement (NDA)',
    'Memorandum of Understanding (MOU)',
    'Invoice',
    'Consent Form',
    'Lease Agreement',
    'Affidavit'
  ];

  documents = [
    {
      title: 'Non-Disclosure Agreement',
      type: 'NDA',
      clientName: 'John Doe',
      summary: 'This NDA protects confidential business information.',
      date: '2024-03-01'
    },
    {
      title: 'Service Contract',
      type: 'Contract',
      clientName: 'Jane Smith',
      summary: 'Outlines services to be provided.',
      date: '2024-04-12'
    }
  ];

  newDoc = {
    title: '',
    type: '',
    clientName: '',
    contact: '',
    summary: '',
    parties: '',
    clauses: '',
    signedBy: '',
    witness: ''
  };

  useAsTemplate(doc: any) {
    this.newDoc.title = `Copy of ${doc.title}`;
    this.newDoc.summary = doc.summary;
    this.newDoc.clientName = doc.clientName || '';
  }

  saveNewDoc() {
    if (this.newDoc.title && this.newDoc.summary && this.newDoc.clientName && this.newDoc.type) {
      const newEntry = {
        ...this.newDoc,
        date: new Date().toISOString().split('T')[0]
      };
      this.documents.unshift(newEntry);
      alert('Document saved successfully!');
      this.newDoc = {
        title: '',
        type: '',
        clientName: '',
        contact: '',
        summary: '',
        parties: '',
        clauses: '',
        signedBy: '',
        witness: ''
      };
    } else {
      alert('Please fill all required fields.');
    }
  }

  // Assessment logic
  currentSet = 0;
  currentQuestionIndex = 0;
  questionsPerSet = 5;
  setScore = 0;
  showSetScore = false;
  selectedOptions: string[] = [];

  allQuestions = [
    {
      question: 'Which document must the client submit to confirm that the estate’s assets have been fairly distributed?',
      options: ['Estate Distribution Report', 'Final Accounting', 'Executor’s Bond', 'Petition for Final Distribution'],
      answer: 'Final Accounting',
      explanation: 'The final accounting is a required document that confirms all assets have been distributed properly and that no discrepancies remain.',
      reference: 'Final Accounting in Probate, Section 11.5'
    },
    {
      question: 'What document does a client file if they wish to amend the will after the probate process has begun?',
      options: ['Will Amendment Petition', 'Amended Probate Petition', 'Notice of Will Change', 'Motion for Amendment'],
      answer: 'Will Amendment Petition',
      explanation: 'If changes to the will are needed during probate, the client must file a will amendment petition to inform the court.',
      reference: 'Amending the Will, Section 12.4'
    },
    {
      question: 'What document must a client file if they are contesting the will?',
      options: ['Petition to Contest Will', 'Will Dispute Petition', 'Motion for Mediation', 'Notice of Objection'],
      answer: 'Petition to Contest Will',
      explanation: 'A petition to contest the will must be filed if the client believes the will is invalid, ensuring the court reviews the contestation.',
      reference: 'Contesting the Will, Section 13.2'
    },
    {
      question: 'Which document must the client file to request a time extension for probate proceedings?',
      options: ['Petition for Extension of Time', 'Notice of Delay', 'Executor’s Affidavit', 'Motion for Continuance'],
      answer: 'Petition for Extension of Time',
      explanation: 'The client can file a petition for extension if more time is needed to complete the probate process or resolve certain issues.',
      reference: 'Filing for Time Extension, Section 14.1'
    },
    {
      question: 'What is required from the client when the final distribution of the estate has been completed?',
      options: ['Estate Distribution Report', 'Affidavit of Final Distribution', 'Final Probate Report', 'Closing Petition'],
      answer: 'Affidavit of Final Distribution',
      explanation: 'The client must file an affidavit of final distribution to confirm that all assets have been distributed according to the will.',
      reference: 'Closing the Estate, Section 15.2'
    },
 
        {
          question: 'What is the first document a client must submit to the court after the death of a loved one?',
          options: ['Death Certificate', 'Will', 'Executor’s Affidavit', 'Petition for Probate'],
          answer: 'Death Certificate',
          explanation: 'The death certificate is one of the first required documents to confirm the passing of the deceased before initiating probate.',
          reference: 'Client Document Requirements, Section 2.1'
        },
        {
          question: 'Which document is required from the client to demonstrate the deceased’s intentions?',
          options: ['Will', 'Notice of Hearing', 'Estate Inventory', 'Affidavit of Claims'],
          answer: 'Will',
          explanation: 'The will is the client’s key document, outlining the deceased’s intentions regarding asset distribution and the appointment of the executor.',
          reference: 'Will as Client Document, Section 3.2'
        },
        {
          question: 'If the client is the executor, what document must they submit to the court?',
          options: ['Executor’s Affidavit', 'Witness Affidavit', 'Executor’s Bond', 'Notice of Petition'],
          answer: 'Executor’s Affidavit',
          explanation: 'The executor must submit an affidavit to confirm their acceptance of the responsibility to manage the estate according to the deceased’s will.',
          reference: 'Executor’s Duties, Section 4.1'
        },
        {
          question: 'What document is essential to verify the appointment of an executor or personal representative?',
          options: ['Order of Appointment', 'Will', 'Executor’s Bond', 'Notice of Executor'],
          answer: 'Order of Appointment',
          explanation: 'The order of appointment confirms the court’s approval of the executor and authorizes them to begin managing the estate.',
          reference: 'Filing Executor Appointment, Section 5.3'
        },
        {
          question: 'What document must a client file to show all debts of the deceased are settled before distributing the estate?',
          options: ['Creditor Payment Affidavit', 'Estate Inventory', 'Final Judgment', 'Notice to Creditors'],
          answer: 'Creditor Payment Affidavit',
          explanation: 'The client must file a creditor payment affidavit to confirm that all debts owed by the deceased have been paid off.',
          reference: 'Settling Debts in Estate, Section 6.2'
        },
        {
          question: 'Which document must a client submit to show the full list of the deceased’s assets?',
          options: ['Estate Inventory', 'Will', 'Final Distribution Plan', 'Proof of Claims'],
          answer: 'Estate Inventory',
          explanation: 'The estate inventory must be filed to present a detailed list of all the deceased’s assets that are to be managed during probate.',
          reference: 'Inventory Submission, Section 7.4'
        },
        {
          question: 'What document is needed to prove the deceased had no outstanding claims?',
          options: ['Affidavit of No Claims', 'Estate Distribution Plan', 'Final Accounting', 'Creditor’s Notice'],
          answer: 'Affidavit of No Claims',
          explanation: 'This affidavit certifies that there are no claims or debts against the estate that need to be addressed during probate.',
          reference: 'Handling Estate Claims, Section 8.3'
        },
        {
          question: 'If the client is named as a beneficiary, which document must they submit?',
          options: ['Affidavit of Beneficiary', 'Proof of Identification', 'Notice of Beneficiaries', 'Petition for Distribution'],
          answer: 'Affidavit of Beneficiary',
          explanation: 'The beneficiary must file an affidavit stating their relationship to the deceased and their claim to the assets.',
          reference: 'Beneficiary Documents, Section 9.1'
        },
        {
          question: 'What document must a client file to officially distribute assets to the beneficiaries?',
          options: ['Distribution Plan', 'Final Accounting', 'Petition for Distribution', 'Notice of Distribution'],
          answer: 'Distribution Plan',
          explanation: 'A distribution plan must be filed by the executor to outline how the estate’s assets will be distributed to beneficiaries according to the will.',
          reference: 'Distributing the Estate, Section 10.2'
        },
       
        {
          question: 'If the client wishes to remove the appointed executor, which document must they submit?',
          options: ['Petition for Removal of Executor', 'Executor’s Bond Petition', 'Executor Objection Form', 'Notice of Removal'],
          answer: 'Petition for Removal of Executor',
          explanation: 'A petition must be filed to request the removal of an executor, typically due to misconduct or inability to fulfill duties.',
          reference: 'Removing the Executor, Section 16.3'
        },
        {
          question: 'What document should the client submit to prove debts have been paid off before the estate can be closed?',
          options: ['Debt Payment Proof', 'Creditor’s Receipt', 'Affidavit of Debt Settlement', 'Final Credit Report'],
          answer: 'Affidavit of Debt Settlement',
          explanation: 'An affidavit of debt settlement must be filed to confirm that the deceased’s debts have been fully paid.',
          reference: 'Paying Debts in Probate, Section 17.4'
        },
        {
          question: 'When does the client need to file a petition for final settlement of the estate?',
          options: ['Before distributing the assets', 'After all debts are settled', 'When the estate is fully inventoried', 'During the initial probate petition'],
          answer: 'After all debts are settled',
          explanation: 'The petition for final settlement is filed only after the estate’s debts have been paid, signaling that the estate is ready to be closed.',
          reference: 'Final Settlement of Estate, Section 18.1'
        },
        {
          question: 'What is required from the client to confirm that no new creditors have come forward?',
          options: ['Notice of Creditor Claims', 'Affidavit of No Further Claims', 'Creditors’ Final Report', 'Final Judgment of Claims'],
          answer: 'Affidavit of No Further Claims',
          explanation: 'The client must file an affidavit of no further claims, confirming that no additional creditors have appeared after the death.',
          reference: 'Handling Creditors, Section 19.2'
        },
        {
          question: 'What document should the client file if they wish to appeal a decision made by the probate court?',
          options: ['Notice of Appeal', 'Appellate Petition', 'Motion for Reconsideration', 'Notice of Objection'],
          answer: 'Notice of Appeal',
          explanation: 'A notice of appeal is filed if the client disagrees with the probate court’s decision and wishes to challenge it in a higher court.',
          reference: 'Appealing Probate Decisions, Section 20.3'
        },
        {
          question: 'What must the client submit after all estate distributions are completed and debts are cleared?',
          options: ['Final Accounting Report', 'Estate Closure Certificate', 'Notice of Closure', 'Estate Final Report'],
          answer: 'Estate Closure Certificate',
          explanation: 'An estate closure certificate confirms that all distributions and debt settlements are complete and that the estate is now closed.',
          reference: 'Closing the Estate, Section 21.4'
        }
    
    
  ];

  get visibleQuestions() {
    const start = this.currentSet * this.questionsPerSet;
    return this.allQuestions.slice(start, start + this.questionsPerSet);
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) this.currentQuestionIndex--;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionsPerSet - 1) this.currentQuestionIndex++;
  }

  submitSet() {
    this.setScore = 0;
    const correctOptions: string[] = [];
    const selectedOptions: string[] = [];
  
    this.visibleQuestions.forEach((q, i) => {
      const chosen = this.selectedOptions[i];
      console.log(`Q${i + 1}: Chose "${chosen}" | Correct: "${q.answer}"`);
  
      correctOptions.push(q.answer);
      selectedOptions.push(chosen);
  
      if (q.answer === chosen) {
        this.setScore++;
      }
    });
  
    this.showSetScore = true;
  
    const assessmentData = {
      document_assessment: `Set ${this.currentSet + 1}`,
      correct_options: correctOptions,
      options_acquired: selectedOptions,
      is_correct: this.setScore === this.visibleQuestions.length,
      total_score: this.setScore
    };
  
    this.clientDocumentService.submitDocumentAssessment(assessmentData).subscribe({
      next: (res) => console.log('Assessment saved:', res),
      error: (err) => console.error('Error submitting assessment:', err)
    });
  }
  

  proceedToNextSet() {
    if (this.currentSet < Math.floor(this.allQuestions.length / this.questionsPerSet) - 1) {
      this.currentSet++;
      this.currentQuestionIndex = 0;
      this.selectedOptions = [];
      this.setScore = 0;
      this.showSetScore = false;
    }
  }
}

