import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NgIf, NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { DetailService } from '../detail.service';
import { HttpClientModule } from '@angular/common/http';

import { MatProgressBar } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';



interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  reference: string;
}
@Component({
  selector: 'app-clerk',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MatCard,
    MatButton,
    MatProgressBar,
    MatRadioModule

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

  constructor(private location: Location, private clerkService: DetailService,  private router: Router) {}

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
  questions: Question[] = []; // Load 25 questions here
  questionsPerSet = 5;
  currentSet = 0;
  visibleQuestions: Question[] = [];
  userAnswers: string[][] = [[], [], [], [], []];
  scoresBySet: number[] = [0, 0, 0, 0, 0];
  totalScore = 0;
  setCompleted: boolean[] = [false, false, false, false, false];
  showSetScore: boolean = false;
  setScore: number = 0;
  selectedOptions: string[] = [];
  currentQuestionIndex = 0;

  goToClerkPage() {
    console.log("clicked the page")
    this.router.navigate(['/clerk']);
    console.log("navigated to clerk page")
  }

  ngOnInit(): void {
    this.loadQuestions();
    this.loadSet(this.currentSet);
  }

  loadQuestions() {
    this.questions = [
      {
        question: 'What is the primary role of a court clerk?',
        options: [
          'Presiding over trials',
          'Enforcing law and order',
          'Maintaining court records',
          'Providing legal advice'
        ],
        answer: 'Maintaining court records',
        explanation: 'Clerks are responsible for managing and maintaining official court records.',
        reference: 'Judicial Service Manual - Sec. 3.2'
      },
      {
        question: 'Which document initiates a civil case in court?',
        options: ['Summon', 'Plea', 'Petition', 'Affidavit'],
        answer: 'Petition',
        explanation: 'A civil case typically begins with a petition or plaint.',
        reference: 'Civil Procedure Code, Order VII Rule 1'
      },
      {
        question: 'Which tool helps schedule hearings?',
        options: ['Calendar Register', 'Summon Sheet', 'Filing Docket', 'Index Register'],
        answer: 'Calendar Register',
        explanation: 'The calendar register is used to manage hearing dates.',
        reference: 'Court Management Handbook'
      },
      {
        question: 'What is issued by the clerk to inform parties about case dates?',
        options: ['Warrant', 'Summons', 'Charge Sheet', 'Bail Order'],
        answer: 'Summons',
        explanation: 'A summon is a legal document issued to notify parties about court appearances.',
        reference: 'CrPC Sec. 61'
      },
      {
        question: 'Which document is required to request a certified copy?',
        options: ['RTI Request', 'Affidavit', 'Copy Application', 'Summon'],
        answer: 'Copy Application',
        explanation: 'A formal application must be submitted to obtain certified copies.',
        reference: 'High Court Copying Rules'
      },
      {
        question: 'Which act governs fees paid in court?',
        options: ['Indian Stamp Act', 'Court Fees Act', 'CrPC', 'IPC'],
        answer: 'Court Fees Act',
        explanation: 'Court fees are regulated under the Court Fees Act.',
        reference: 'Court Fees Act, 1870'
      },
      {
        question: 'Who assists the judge in maintaining decorum?',
        options: ['Lawyer', 'Bailiff', 'Registrar', 'Clerk'],
        answer: 'Registrar',
        explanation: 'The registrar ensures the smooth running of the courtroom under the judge.',
        reference: 'Judicial Administration Guide'
      },
      {
        question: 'Which is an alternative dispute resolution (ADR) method?',
        options: ['Appeal', 'Bail Hearing', 'Lok Adalat', 'Injunction'],
        answer: 'Lok Adalat',
        explanation: 'Lok Adalat provides an ADR mechanism to resolve disputes amicably.',
        reference: 'Legal Services Authorities Act'
      },
      {
        question: 'What is the first step in criminal case initiation?',
        options: ['Summons', 'FIR', 'Petition', 'Copy Application'],
        answer: 'FIR',
        explanation: 'FIR (First Information Report) starts the criminal investigation process.',
        reference: 'CrPC Sec. 154'
      },
      {
        question: 'Which document notifies a person to appear in court?',
        options: ['Affidavit', 'Warrant', 'Summons', 'Subpoena'],
        answer: 'Summons',
        explanation: 'Summons is issued for appearance; warrant is for arrest.',
        reference: 'CrPC Sec. 61'
      },
  
      // Set 2
      {
        question: 'What is a docket used for?',
        options: ['Evidence logging', 'Case summary tracking', 'Witness management', 'Judgment writing'],
        answer: 'Case summary tracking',
        explanation: 'Dockets contain a running summary of proceedings.',
        reference: 'Judicial Forms Manual'
      },
      {
        question: 'Clerks prepare ________ for day-to-day case updates.',
        options: ['Order Sheets', 'Affidavits', 'Judgments', 'Depositions'],
        answer: 'Order Sheets',
        explanation: 'Order sheets record court directions and dates.',
        reference: 'Court Procedure Rules'
      },
      {
        question: 'To file a case, a ________ must be paid.',
        options: ['Late fee', 'Admission charge', 'Court fee', 'Penalty'],
        answer: 'Court fee',
        explanation: 'Filing involves a mandatory court fee.',
        reference: 'Court Fees Act'
      },
      {
        question: 'When parties resolve disputes outside court, it is called:',
        options: ['Dismissal', 'Plea bargain', 'ADR', 'Litigation'],
        answer: 'ADR',
        explanation: 'Alternative Dispute Resolution (ADR) methods include mediation, arbitration.',
        reference: 'Legal Services Authorities Act'
      },
      {
        question: 'Which official signs certified copies?',
        options: ['Lawyer', 'Registrar', 'Clerk', 'Magistrate'],
        answer: 'Clerk',
        explanation: 'Court clerks authenticate certified copies.',
        reference: 'High Court Copying Rules'
      },
  
      // Set 3
      {
        question: 'In criminal matters, who prepares charge sheets?',
        options: ['Clerk', 'Police', 'Lawyer', 'Court'],
        answer: 'Police',
        explanation: 'Charge sheets are prepared by police post-investigation.',
        reference: 'CrPC Sec. 173'
      },
      {
        question: 'What is the purpose of cause list?',
        options: ['Check fines', 'List court holidays', 'Show daily hearings', 'Warrant list'],
        answer: 'Show daily hearings',
        explanation: 'Cause list shows cases to be heard on a particular day.',
        reference: 'Court Management System'
      },
      {
        question: 'What is the role of diary register?',
        options: ['To track correspondence', 'Log visitors', 'Record appeals', 'Maintain case flow'],
        answer: 'Maintain case flow',
        explanation: 'Diary register records filing and progress of cases.',
        reference: 'Judicial Registers Manual'
      },
      {
        question: 'Certified copies are used for:',
        options: ['New FIRs', 'Secondary evidence', 'Summons delivery', 'Investigation'],
        answer: 'Secondary evidence',
        explanation: 'Certified copies serve as admissible copies in related proceedings.',
        reference: 'Indian Evidence Act'
      },
  
      // Set 4
      {
        question: 'What is a return memo?',
        options: ['Payment receipt', 'Warrant explanation', 'Rejection notice for documents', 'Order sheet'],
        answer: 'Rejection notice for documents',
        explanation: 'Return memo is issued if filing has errors or is incomplete.',
        reference: 'Court Filing Manual'
      },
      {
        question: 'Who is responsible for indexing case files?',
        options: ['Judge', 'Court Officer', 'Registrar', 'Clerk'],
        answer: 'Clerk',
        explanation: 'Court clerks prepare the index to maintain proper file structure.',
        reference: 'File Management Handbook'
      },
      {
        question: 'What happens if court fee is not paid?',
        options: ['Immediate rejection', 'Delay in listing', 'Case remains dormant', 'All of the above'],
        answer: 'All of the above',
        explanation: 'Court fee is mandatory — non-payment can lead to rejection or delay.',
        reference: 'Court Fees Act'
      },
      {
        question: 'A court clerk CANNOT:',
        options: ['Advise on law', 'File orders', 'Maintain cause lists', 'Issue certified copies'],
        answer: 'Advise on law',
        explanation: 'Clerks are not legally permitted to offer legal advice.',
        reference: 'Judicial Ethics Handbook'
      },
  
      // Set 5
      {
        question: 'In Lok Adalat, disputes are resolved by:',
        options: ['Trial', 'Compromise', 'Police', 'Arrest'],
        answer: 'Compromise',
        explanation: 'Lok Adalat emphasizes compromise and mutual agreement.',
        reference: 'Legal Services Authorities Act'
      },
      {
        question: 'Clerks should update ________ daily.',
        options: ['Cause list', 'Evidence box', 'Judge’s order', 'Witness register'],
        answer: 'Cause list',
        explanation: 'Cause list is the most frequently updated document.',
        reference: 'Daily Judicial Procedure'
      },
      {
        question: 'What is entered into the order sheet?',
        options: ['Verdict only', 'Procedural orders', 'Objections', 'Evidence'],
        answer: 'Procedural orders',
        explanation: 'Order sheet captures each hearing’s outcomes and directions.',
        reference: 'Case File Structure Manual'
      },
      {
        question: 'Court Clerk ensures compliance with:',
        options: ['Filing rules', 'Legal ethics', 'Trial verdicts', 'Defense strategies'],
        answer: 'Filing rules',
        explanation: 'Clerks verify that all filings are legally complete.',
        reference: 'Court Filing SOP'
      },
      {
        question: 'Who maintains the summons dispatch register?',
        options: ['Court police', 'Magistrate', 'Court clerk', 'Court stenographer'],
        answer: 'Court clerk',
        explanation: 'Clerks track dispatch and return of summons.',
        reference: 'Court Registers Handbook'
      }
    ];
  }
  

  loadSet(setIndex: number) {
    const start = setIndex * this.questionsPerSet;
    const end = start + this.questionsPerSet;
    this.visibleQuestions = this.questions.slice(start, end).map(q => ({
      ...q,
      options: this.shuffleArray([...q.options]),
    }));
    this.showSetScore = false;
    this.setScore = 0;
    this.currentQuestionIndex = 0;
    this.selectedOptions = [];
  }

  shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  selectAnswer(option: string) {
    this.selectedOptions[this.currentQuestionIndex] = option;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.visibleQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  submitSet() {
    let score = 0;
    const correctOptions: string[] = [];
    const selectedOptions: string[] = [];
  
    this.visibleQuestions.forEach((q, i) => {
      const selected = this.selectedOptions[i];
      const correct = q.answer;
  
      selectedOptions.push(selected);
      correctOptions.push(correct);
  
      if (selected === correct) {
        score++;
      }
    });
  
    const isCorrect = score === this.visibleQuestions.length;
  
    const payload = {
      clerk_assessment: `Set ${this.currentSet + 1}`,
      correct_options: correctOptions,
      options_acquired: selectedOptions,
      is_correct: isCorrect,
      total_score: score
    };
  
    this.clerkService.submitAssessment(payload).subscribe({
      next: (res) => console.log('✅ Assessment saved:', res),
      error: (err) => console.error('❌ Save error:', err)
    });
  
    this.scoresBySet[this.currentSet] = score;
    this.totalScore += score;
    this.setCompleted[this.currentSet] = true;
    this.setScore = score;
    this.showSetScore = true;
  }
  
  

  proceedToNextSet() {
    if (this.currentSet < 4) {
      this.currentSet++;
      this.loadSet(this.currentSet);
    } else {
      this.navigateToDashboard();
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard'], {
      state: {
        scoresBySet: this.scoresBySet,
        totalScore: this.totalScore
      }
    });
  }
  isAssessmentStarted = false;

startAssessment() {
  this.isAssessmentStarted = true;
}



}
