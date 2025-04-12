import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, Location } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { DetailService } from '../detail.service';


export interface CourtFiling {
  caseNumber: string;
  caseTitle: string;
  filingDate: string;
  status: string;
}

@Component({
  selector: 'app-courtfilings',
  standalone: true,
  imports: [
    MatTableModule,
    MatChipsModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSidenav,
    MatRadioModule,
    MatSidenavModule,
  ],
  templateUrl: './courtfilings.component.html',
  styleUrl: './courtfilings.component.scss',
})
export class CourtfilingsComponent {
  searchText: string = '';

  constructor(private location: Location,private courtFilingService:DetailService) {}

  goBack(): void {
    this.location.back(); // Navigates to the previous page in browser history
  }

  
  displayedColumns: string[] = ['caseId', 'caseName', 'filingDate', 'status'];

  dataSource = new MatTableDataSource( [
    { caseId: 'CF-101', caseName: 'Thiruppathi vs Arumugam', filingDate: '2024-10-01', status: 'Pending' },
    { caseId: 'CF-102', caseName: 'Muthu vs Ganesh', filingDate: '2024-09-28', status: 'Approved' },
    { caseId: 'CF-103', caseName: 'Lakshmi vs Rajendran', filingDate: '2024-09-26', status: 'Under Review' },
    { caseId: 'CF-104', caseName: 'Kumar vs Kumaravel', filingDate: '2024-09-22', status: 'Rejected' },
    { caseId: 'CF-105', caseName: 'Revathi vs Inspector', filingDate: '2024-09-20', status: 'Pending' },
    { caseId: 'CF-106', caseName: 'Suresh vs Bhavani', filingDate: '2024-09-18', status: 'Approved' },
    { caseId: 'CF-107', caseName: 'Anitha vs Collector', filingDate: '2024-09-15', status: 'Rejected' },
    { caseId: 'CF-108', caseName: 'Dinesh vs Sathya', filingDate: '2024-09-12', status: 'Under Review' },
    { caseId: 'CF-109', caseName: 'Tharani vs Mani', filingDate: '2024-09-10', status: 'Approved' },
    { caseId: 'CF-110', caseName: 'Gopal vs State', filingDate: '2024-09-08', status: 'Pending' },
    { caseId: 'CF-111', caseName: 'Vasanthi vs Venkatesh', filingDate: '2024-09-05', status: 'Approved' },
    { caseId: 'CF-112', caseName: 'Malar vs Sudha', filingDate: '2024-09-03', status: 'Under Review' },
    { caseId: 'CF-113', caseName: 'Hari vs Sub-Inspector', filingDate: '2024-09-01', status: 'Rejected' },
    { caseId: 'CF-114', caseName: 'Nila vs Arun', filingDate: '2024-08-30', status: 'Pending' },
    { caseId: 'CF-115', caseName: 'Velu vs Babu', filingDate: '2024-08-28', status: 'Approved' },
    { caseId: 'CF-116', caseName: 'Keerthi vs Officer', filingDate: '2024-08-26', status: 'Rejected' },
    { caseId: 'CF-117', caseName: 'Raja vs Raja', filingDate: '2024-08-24', status: 'Under Review' },
    { caseId: 'CF-118', caseName: 'Meena vs Prakash', filingDate: '2024-08-22', status: 'Approved' },
    { caseId: 'CF-119', caseName: 'Saravanan vs Dhanam', filingDate: '2024-08-20', status: 'Pending' },
    { caseId: 'CF-120', caseName: 'Priya vs Ilango', filingDate: '2024-08-18', status: 'Rejected' },
  ]);

  

  ngOnInit() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.caseId.toLowerCase().includes(filter) ||
             data.caseName.toLowerCase().includes(filter);
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  showAssessment = false;
  isAssessmentStarted = false;
  currentSet = 0;
  currentQuestionIndex = 0;
  questionsPerSet = 5;
  selectedOptions: string[] = [];
  setScore = 0;
  showSetScore = false;

  startAssessment() {
    this.isAssessmentStarted = true;
    this.showSetScore = false;
    this.currentSet = 0;
    this.currentQuestionIndex = 0;
    this.selectedOptions = [];
  }
  allQuestions = [
  
        {
          question: 'What is the first step in filing a petition for probate in a funeral case?',
          options: ['Obtain a copy of the will', 'File the death certificate', 'Notify the beneficiaries', 'Submit a petition to the court'],
          answer: 'Submit a petition to the court',
          explanation: 'The first step in probate proceedings is submitting a formal petition to the court to initiate the process.',
          reference: 'Probate Filing Procedures, Section 1.2'
        },
        {
          question: 'Which document must the clerk ensure is filed along with the probate petition?',
          options: ['Affidavit of heirs', 'Death certificate', 'Witness testimony', 'Executor’s affidavit'],
          answer: 'Death certificate',
          explanation: 'The death certificate is a required document to file along with the probate petition to verify the death of the individual.',
          reference: 'Filing Requirements for Probate, Chapter 2'
        },
        {
          question: 'What must the advocate do to begin the probate court process after receiving the petition?',
          options: ['File a motion to appoint an executor', 'Prepare the estate inventory', 'Serve the notice to the beneficiaries', 'Schedule the probate hearing'],
          answer: 'Serve the notice to the beneficiaries',
          explanation: 'The advocate is responsible for notifying the beneficiaries of the probate hearing after the petition is filed.',
          reference: 'Advocate’s Role in Court Filings, Section 3.1'
        },
        {
          question: 'Which action should the clerk take when a petition for probate is filed?',
          options: ['Verify the completeness of the petition', 'Notify the beneficiaries', 'Set a hearing date', 'Prepare the final distribution statement'],
          answer: 'Verify the completeness of the petition',
          explanation: 'The clerk verifies that all required documents are submitted with the petition for probate before processing it.',
          reference: 'Clerk Responsibilities in Filing, Section 4.3'
        },
        {
          question: 'What document must be filed to prove the deceased’s last will and testament?',
          options: ['Executor’s affidavit', 'Death certificate', 'Probate petition', 'Will submission'],
          answer: 'Will submission',
          explanation: 'The original will must be submitted for probate to validate its authenticity and ensure the executor is appointed.',
          reference: 'Submitting the Will for Probate, Page 22'
        },
        {
          question: 'When is the clerk required to issue a notice of the probate hearing?',
          options: ['Before filing the petition', 'After receiving the petition', 'Upon the executor’s request', 'After the judge approves the petition'],
          answer: 'After receiving the petition',
          explanation: 'The clerk issues a notice of the probate hearing after receiving the petition for probate and confirming all documents are in order.',
          reference: 'Clerk’s Role in Notification, Section 5.1'
        },
        {
          question: 'Which document must the advocate file to obtain legal authority to manage the estate?',
          options: ['Notice of appearance', 'Petition for probate', 'Executor’s affidavit', 'Estate inventory'],
          answer: 'Petition for probate',
          explanation: 'The advocate files the petition for probate to request the court’s approval for the executor to manage the estate.',
          reference: 'Filing the Petition for Probate, Section 6.1'
        },
        {
          question: 'What is the primary role of the clerk after receiving the filed probate petition?',
          options: ['Schedule the probate hearing', 'Verify the signatures', 'Notify the judge of the case', 'Issue a certificate of probate'],
          answer: 'Schedule the probate hearing',
          explanation: 'Once the petition is filed, the clerk schedules the probate hearing to ensure the estate is properly administered.',
          reference: 'Clerk’s Responsibilities Post-Submission, Chapter 7'
        },
        {
          question: 'In a funeral case, when must the executor submit the final estate inventory to the court?',
          options: ['Immediately after the will is filed', 'After the probate hearing', 'Before the probate petition is filed', 'After debts are paid'],
          answer: 'After the probate hearing',
          explanation: 'The executor is required to submit the final estate inventory after the probate hearing has taken place and the court has validated the will.',
          reference: 'Final Estate Inventory Filing, Section 8.3'
        },
        {
          question: 'What should the advocate ensure is filed along with the will for probate validation?',
          options: ['Executor’s letter of appointment', 'Witness affidavit', 'Death certificate', 'Notice of creditors'],
          answer: 'Witness affidavit',
          explanation: 'The advocate must ensure that a witness affidavit is filed to validate the authenticity of the will during probate.',
          reference: 'Witness Testimony and Probate, Section 9.1'
        },
        {
          question: 'When should the clerk issue a notice to creditors in a probate case?',
          options: ['After the will is validated', 'Before filing the probate petition', 'After the probate hearing', 'Upon executor’s appointment'],
          answer: 'After the will is validated',
          explanation: 'The clerk issues the notice to creditors after the will is validated and the probate process officially begins.',
          reference: 'Notice to Creditors Process, Section 10.2'
        },
        {
          question: 'What is the role of the clerk in ensuring the final distribution of the estate?',
          options: ['Ensure the assets are liquidated', 'Review the executor’s final report', 'Ensure the creditors are notified', 'File the final judgment'],
          answer: 'Review the executor’s final report',
          explanation: 'The clerk reviews the executor’s final report to ensure that the estate is distributed according to the will and legal guidelines.',
          reference: 'Final Distribution Procedures, Chapter 12'
        },
        {
          question: 'Which action must the advocate take after the court validates the will?',
          options: ['File an appeal', 'Prepare the estate distribution plan', 'Notify the beneficiaries of the outcome', 'Submit the executor’s bond'],
          answer: 'Prepare the estate distribution plan',
          explanation: 'After the will is validated, the advocate must ensure the estate is divided according to the terms of the will.',
          reference: 'Post-Probate Actions, Section 13.4'
        },
        {
          question: 'What document should the clerk file to officially appoint an executor after the probate petition is approved?',
          options: ['Executor’s bond', 'Certificate of probate', 'Final judgment', 'Affidavit of distribution'],
          answer: 'Certificate of probate',
          explanation: 'The clerk files a certificate of probate to officially appoint the executor and grant them authority to manage the estate.',
          reference: 'Appointing the Executor, Section 11.3'
        },
        {
          question: 'What is the responsibility of the advocate during the probate hearing?',
          options: ['File the final estate report', 'Present evidence to validate the will', 'Notify the creditors', 'Arrange the distribution of assets'],
          answer: 'Present evidence to validate the will',
          explanation: 'The advocate’s role during the probate hearing is to present evidence to prove the validity of the will and support the executor’s appointment.',
          reference: 'Advocate’s Role in Probate Hearings, Section 14.2'
        },
        {
          question: 'What document must the clerk file after the probate hearing concludes?',
          options: ['Certificate of death', 'Order of probate', 'Final accounting', 'Estate distribution notice'],
          answer: 'Order of probate',
          explanation: 'After the probate hearing concludes, the clerk files the order of probate to officially validate the will and appoint the executor.',
          reference: 'Post-Hearing Clerk Actions, Section 15.1'
        },
        {
          question: 'What is required from the executor before they begin distributing the estate’s assets?',
          options: ['File the final estate accounting', 'Obtain a distribution order', 'Secure permission from the beneficiaries', 'Notify the court of the distribution'],
          answer: 'File the final estate accounting',
          explanation: 'Before distributing the estate, the executor must file a final accounting to show the court how the assets were handled.',
          reference: 'Executor’s Distribution Duties, Section 16.3'
        },
        {
          question: 'What should the clerk do if a dispute arises among beneficiaries regarding the estate distribution?',
          options: ['Schedule a mediation session', 'File a motion to dismiss', 'Notify the judge', 'Postpone the distribution'],
          answer: 'Notify the judge',
          explanation: 'The clerk must inform the judge of any disputes among beneficiaries, so the court can resolve them.',
          reference: 'Handling Estate Disputes, Chapter 17'
        },
        {
          question: 'What is the advocate’s responsibility regarding creditors during probate?',
          options: ['Notify them of the estate’s debts', 'Ensure debts are paid before asset distribution', 'File a creditor’s claim', 'Seek creditor approval for the will'],
          answer: 'Ensure debts are paid before asset distribution',
          explanation: 'The advocate ensures that all outstanding debts are settled before the estate is distributed to the beneficiaries.',
          reference: 'Creditors in Probate, Section 18.2'
        },
        {
          question: 'What document must be filed to officially close a probate case?',
          options: ['Affidavit of closure', 'Estate distribution report', 'Final judgment', 'Executor’s report'],
          answer: 'Affidavit of closure',
          explanation: 'To officially close the probate case, the executor must file an affidavit of closure confirming that all procedures have been completed.',
          reference: 'Closing Probate Cases, Section 19.1'
        },
        {
          question: 'What is the role of the clerk after the final estate report is filed?',
          options: ['Verify the distribution details', 'Prepare the court’s final judgment', 'Notify the beneficiaries of the closure', 'Submit the will for public record'],
          answer: 'Verify the distribution details',
          explanation: 'The clerk verifies that the distribution details in the final estate report are accurate before closing the case.',
          reference: 'Clerk’s Role in Estate Closure, Section 20.2'
        }
      ];
  
  getStatusIcon(status: string): string {
    switch (status) {
      case 'Approved': return 'check_circle';
      case 'Pending': return 'hourglass_empty';
      case 'Rejected': return 'cancel';
      default: return 'help_outline';
    }
  }

  getStatusIconClass(status: string): string {
    switch (status) {
      case 'Approved': return 'status-icon approved';
      case 'Pending': return 'status-icon pending';
      case 'Rejected': return 'status-icon rejected';
      default: return 'status-icon unknown';
    }
  }
  
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
      const selected = this.selectedOptions[i];
      const correct = q.answer;
  
      correctOptions.push(correct);
      selectedOptions.push(selected);
  
      if (selected === correct) {
        this.setScore++;
      }
    });
  
    this.showSetScore = true;
  
    const assessmentData = {
      filing_assessment: `Set ${this.currentSet + 1}`,
      correct_options: correctOptions,
      options_acquired: selectedOptions,
      is_correct: this.setScore === this.visibleQuestions.length,
      total_score: this.setScore
    };
  
    this.courtFilingService.submitFilingAssessment(assessmentData).subscribe({
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
    } else {
      this.isAssessmentStarted = false;
    }
  }
}
