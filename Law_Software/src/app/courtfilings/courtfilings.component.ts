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

  constructor(private location: Location) {}

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
      question: 'What document confirms a court filing?',
      options: ['Filing receipt', 'Witness note', 'Verdict sheet', 'ID proof'],
      answer: 'Filing receipt'
    },
    {
      question: 'What field helps search filings quickly?',
      options: ['Case Type', 'Case Name or ID', 'Filing Office', 'Lawyer Name'],
      answer: 'Case Name or ID'
    },
    {
      question: 'Who files the case in court?',
      options: ['Plaintiff', 'Judge', 'Clerk', 'Bailiff'],
      answer: 'Plaintiff'
    },
    {
      question: 'Status "Under Review" means?',
      options: ['Case is complete', 'Case is rejected', 'Case is still being reviewed', 'Filed again'],
      answer: 'Case is still being reviewed'
    },
    {
      question: 'Filing Date refers to?',
      options: ['Judgment day', 'Approval day', 'Submission day', 'Lawyer visit'],
      answer: 'Submission day'
    },
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
    } else {
      this.isAssessmentStarted = false;
    }
  }
}
