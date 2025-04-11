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

  constructor(private location: Location ,private router: Router) {}

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
      question: 'Which document is best suited for outlining mutual confidentiality between parties?',
      options: ['Contract', 'Invoice', 'NDA', 'Lease Agreement'],
      answer: 'NDA'
    },
    {
      question: 'What key detail must be included in every document?',
      options: ['Client’s favorite color', 'Client Name', 'Witness birthdate', 'Document font'],
      answer: 'Client Name'
    },
    {
      question: 'A clause stating responsibilities of each party belongs under which section?',
      options: ['Summary', 'Clauses and Terms', 'Parties Involved', 'Witness'],
      answer: 'Clauses and Terms'
    },
    {
      question: 'Which field is optional but commonly used to identify validation?',
      options: ['Witness', 'Signed By', 'Contact', 'Document Type'],
      answer: 'Witness'
    },
    {
      question: 'An invoice typically does not include which section?',
      options: ['Amount Due', 'Signed By', 'Client Name', 'Summary'],
      answer: 'Signed By'
    },
    {
      question: 'Which form confirms a client’s agreement to proceed?',
      options: ['Consent Form', 'Lease Agreement', 'Affidavit', 'MOU'],
      answer: 'Consent Form'
    },
    {
      question: 'A lease agreement defines terms primarily for what?',
      options: ['Employment', 'Property use', 'Medical procedures', 'Software usage'],
      answer: 'Property use'
    },
    {
      question: 'Which document is best for recording sworn statements?',
      options: ['MOU', 'Affidavit', 'Invoice', 'Contract'],
      answer: 'Affidavit'
    },
    {
      question: 'A signed witness helps in:',
      options: ['Billing', 'Legitimacy', 'Communication', 'Drafting'],
      answer: 'Legitimacy'
    },
    {
      question: 'A document summary should be:',
      options: ['Personal opinion', 'Brief overview', 'Price list', 'Random notes'],
      answer: 'Brief overview'
    },
    {
      question: 'To copy data from existing doc, use:',
      options: ['New Tab', 'Use As Template', 'Download PDF', 'Redo Button'],
      answer: 'Use As Template'
    },
    {
      question: 'A contract should include which of the following?',
      options: ['Client birthday', 'Parties Involved', 'Font size', 'Watermark'],
      answer: 'Parties Involved'
    },
    {
      question: 'If the client has no contact provided, what should happen?',
      options: ['Form blocks', 'Continue as optional', 'Auto-fill name', 'Throw error'],
      answer: 'Continue as optional'
    },
    {
      question: 'Document title is used to:',
      options: ['Sort alphabetically', 'Identify document purpose', 'Hide summary', 'Encrypt content'],
      answer: 'Identify document purpose'
    },
    {
      question: 'Memorandum of Understanding (MOU) is:',
      options: ['Informal agreement', 'Final contract', 'Affidavit clause', 'Invoice'],
      answer: 'Informal agreement'
    },
    {
      question: 'A document created today would have date as:',
      options: ['Auto-generated', 'Manually entered only', 'Left blank', 'Invalid'],
      answer: 'Auto-generated'
    },
    {
      question: 'Which of these fields is best for identifying legal responsibilities?',
      options: ['Clauses', 'Client Name', 'Contact', 'Witness'],
      answer: 'Clauses'
    },
    {
      question: 'Documents saved appear under:',
      options: ['Recycle bin', 'Client profile', 'Existing Documents', 'Notifications'],
      answer: 'Existing Documents'
    },
    {
      question: 'Signed By refers to:',
      options: ['Lawyer', 'System Admin', 'Client or Authorized Party', 'Witness'],
      answer: 'Client or Authorized Party'
    },
    {
      question: 'What happens when Save Document button is clicked?',
      options: ['New form is generated', 'Document is deleted', 'Data is saved and cleared', 'Server restarts'],
      answer: 'Data is saved and cleared'
    },
    {
      question: '“Clauses and Terms” are used to:',
      options: ['List party names', 'Explain document styling', 'Define responsibilities & conditions', 'Record fonts'],
      answer: 'Define responsibilities & conditions'
    },
    {
      question: 'Which document type protects proprietary information?',
      options: ['Invoice', 'Affidavit', 'NDA', 'Lease Agreement'],
      answer: 'NDA'
    },
    {
      question: 'To validate form input, which should be marked required?',
      options: ['Summary & Type', 'Clauses only', 'Witness only', 'Font color'],
      answer: 'Summary & Type'
    },
    {
      question: '“Use As Template” copies content from:',
      options: ['Random document', 'Selected document', 'Empty form', 'New page'],
      answer: 'Selected document'
    },
    {
      question: 'A document used for payment information is:',
      options: ['Invoice', 'Affidavit', 'NDA', 'Agreement'],
      answer: 'Invoice'
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
    this.visibleQuestions.forEach((q, i) => {
      const chosen = this.selectedOptions[i];
      console.log(`Q${i + 1}: Chose "${chosen}" | Correct: "${q.answer}"`);
      if (q.answer === chosen) this.setScore++;
    });
    this.showSetScore = true;
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
