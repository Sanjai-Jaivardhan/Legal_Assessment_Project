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
        question: 'What is the first step a clerk must take when a funeral case is filed in the court?',
        options: ['File the petition', 'Verify the death certificate', 'Set the hearing date', 'Notify the executor'],
        answer: 'File the petition',
        explanation: 'The clerk files the petition for probate as the first step in processing the case.',
        reference: 'Probate Court Process, Section 1.2'
      },
      {
        question: 'As an advocate handling a funeral case, what primary responsibility do you have during the probate process?',
        options: ['Represent the deceased\'s family', 'Ensure proper legal documentation', 'Distribute the estate', 'Administer the will'],
        answer: 'Ensure proper legal documentation',
        explanation: 'The advocate ensures that all legal documents are properly submitted to the court, including the will and other probate papers.',
        reference: 'Legal Procedures Handbook, Chapter 4'
      },
      {
        question: 'Which document is most crucial for the clerk to process after a deceased person’s will is filed?',
        options: ['Death certificate', 'Probate petition', 'Last will and testament', 'Affidavit of heirs'],
        answer: 'Probate petition',
        explanation: 'The clerk processes the probate petition to begin the court’s review of the will and initiate estate distribution.',
        reference: 'Probate Process, Section 2.1'
      },
      {
        question: 'What must the advocate provide to the court to validate the deceased’s will?',
        options: ['Death certificate', 'Executor\'s affidavit', 'Probate petition', 'Witness testimony'],
        answer: 'Witness testimony',
        explanation: 'The advocate may need to present witness testimony confirming that the will was signed properly.',
        reference: 'Legal Procedure for Will Validation, Chapter 5'
      },
      {
        question: 'In a funeral case, who is responsible for preparing the final distribution of the deceased’s assets?',
        options: ['The clerk', 'The judge', 'The advocate', 'The executor'],
        answer: 'The executor',
        explanation: 'The executor is responsible for distributing the deceased’s assets according to the will, under court supervision.',
        reference: 'Estate Administration Guide, Section 3.4'
      },
      {
        question: 'As an advocate, how do you ensure that the court recognizes the will as valid?',
        options: ['Submit the will with the probate petition', 'Check for signatures', 'Verify the will\'s content', 'Notify the beneficiaries'],
        answer: 'Submit the will with the probate petition',
        explanation: 'The advocate submits the original will along with the probate petition for court validation.',
        reference: 'Probate Court Procedures, Page 30'
      },
      {
        question: 'Which of the following is an action performed by the clerk during the funeral case?',
        options: ['Prepare the estate inventory', 'Review legal contracts', 'Ensure document submission for probate', 'Defend the deceased\'s will'],
        answer: 'Ensure document submission for probate',
        explanation: 'The clerk ensures that all necessary documents, including the will, are submitted properly for the probate process.',
        reference: 'Clerk Responsibilities in Probate, Section 4.1'
      },
      {
        question: 'What role does the clerk play after the deceased’s will is submitted for probate?',
        options: ['Arrange a hearing date', 'Initiate the asset distribution', 'Defend the estate\'s value', 'Create a legal defense for the executor'],
        answer: 'Arrange a hearing date',
        explanation: 'The clerk is responsible for setting a hearing date for the probate court to validate the will.',
        reference: 'Court Process for Probate, Chapter 2'
      },
      {
        question: 'What document should the advocate ensure is filed alongside the will during probate?',
        options: ['Petition for probate', 'Notice of appearance', 'Executor\'s affidavit', 'Death certificate'],
        answer: 'Petition for probate',
        explanation: 'The petition for probate must be filed with the court along with the will to begin the probate process.',
        reference: 'Legal Process for Estate Handling, Section 2.2'
      },
      {
        question: 'Which of the following is typically required by the clerk when processing probate for a deceased person?',
        options: ['Inventory of the deceased’s estate', 'Witness affidavit', 'Final distribution form', 'Notice of appeal'],
        answer: 'Inventory of the deceased’s estate',
        explanation: 'The clerk ensures the inventory of the deceased’s estate is filed to assist in probate proceedings.',
        reference: 'Estate Inventory Filing Requirements, Section 6.3'
      },
      {
        question: 'What is the responsibility of the advocate in informing the beneficiaries of the probate hearing?',
        options: ['Notify them of their rights', 'Arrange transportation', 'Prepare the court documents', 'Negotiate the will’s distribution'],
        answer: 'Notify them of their rights',
        explanation: 'The advocate must inform the beneficiaries of their legal rights in the probate process to avoid future disputes.',
        reference: 'Beneficiary Rights in Probate, Chapter 3'
      },
      {
        question: 'What does the clerk verify regarding the will during the probate process?',
        options: ['Asset valuation', 'Family inheritance claims', 'Signature authenticity', 'Witness testimony'],
        answer: 'Signature authenticity',
        explanation: 'The clerk verifies that the will has been properly signed and witnessed before proceeding with the probate process.',
        reference: 'Will Validation Process, Section 3.2'
      },
      {
        question: 'What action should the advocate take if the will is contested by family members?',
        options: ['Defend the executor’s actions', 'File a motion for dismissal', 'Negotiate the estate division', 'File an objection on behalf of the beneficiaries'],
        answer: 'Defend the executor’s actions',
        explanation: 'The advocate represents the executor’s actions and defends the legality of the will against family contests.',
        reference: 'Handling Will Contests, Page 45'
      },
      {
        question: 'What document does the clerk issue to the executor after the will is validated?',
        options: ['Letters of administration', 'Certificate of probate', 'Executor’s bond', 'Final will affidavit'],
        answer: 'Certificate of probate',
        explanation: 'The clerk issues a certificate of probate to the executor once the will is validated and probate is granted.',
        reference: 'Issuing Probate Documents, Section 4.1'
      },
      {
        question: 'In which case should the advocate challenge the validity of the will?',
        options: ['If there’s an issue with the executor’s appointment', 'If the will contains unclear instructions', 'If the will is unsigned', 'If the beneficiaries dispute the terms'],
        answer: 'If the will is unsigned',
        explanation: 'If the will is unsigned, it lacks legal validity, and the advocate must challenge its validity in court.',
        reference: 'Legal Validity of Wills, Section 2.3'
      },
      {
        question: 'What is the first action the clerk must take upon receiving a petition for probate?',
        options: ['Verify the petition’s content', 'Set a date for the probate hearing', 'Contact the beneficiaries', 'Submit the petition to the judge'],
        answer: 'Verify the petition’s content',
        explanation: 'The clerk first ensures that the petition for probate is complete and accurate before moving forward.',
        reference: 'Clerk Responsibilities in Probate, Chapter 5'
      },
      {
        question: 'What document must the advocate submit to initiate the legal process of estate distribution?',
        options: ['Executor’s affidavit', 'Final estate report', 'Probate petition', 'Notice of distribution'],
        answer: 'Probate petition',
        explanation: 'The advocate must submit the probate petition, which officially starts the legal process for distributing the deceased’s estate.',
        reference: 'Probate Initiation Process, Page 21'
      },
      {
        question: 'Which role does the clerk perform in relation to the estate’s debts during the probate process?',
        options: ['Assess the value of the estate', 'Contact creditors', 'File notices of debt', 'Prepare the final distribution statement'],
        answer: 'Contact creditors',
        explanation: 'The clerk may be responsible for ensuring that all debts owed by the estate are addressed before distributing the assets.',
        reference: 'Handling Estate Debts, Section 4.2'
      },
      {
        question: 'What must the clerk do if there are disputes between the beneficiaries?',
        options: ['Issue a decree', 'Mediate the dispute', 'Notify the judge', 'Prepare the will for review'],
        answer: 'Notify the judge',
        explanation: 'The clerk must notify the judge of any disputes among the beneficiaries so that the court can address them accordingly.',
        reference: 'Dispute Resolution in Probate, Section 6.4'
      },
      {
        question: 'What is the primary responsibility of the clerk after the probate hearing?',
        options: ['Finalize the estate inventory', 'Issue probate certificate', 'Oversee the asset distribution', 'Contact the deceased’s creditors'],
        answer: 'Issue probate certificate',
        explanation: 'Once the probate hearing concludes, the clerk issues the probate certificate, allowing the executor to begin estate distribution.',
        reference: 'Post-Hearing Procedures, Page 31'
      },
      {
        question: 'As an advocate, what must you do to ensure that all beneficiaries receive their entitled shares?',
        options: ['Prepare the estate inventory', 'File a distribution request', 'Ensure proper asset distribution', 'Notify the court of the total estate value'],
        answer: 'Ensure proper asset distribution',
        explanation: 'The advocate ensures that all assets are properly distributed according to the will’s instructions and the beneficiaries’ rights.',
        reference: 'Asset Distribution, Chapter 7'
      },
      {
        question: 'What is the role of the clerk in case of an appeal against the probate ruling?',
        options: ['File the appeal papers', 'Schedule a new hearing date', 'Inform the judge of the appeal', 'Serve the court’s notice of appeal'],
        answer: 'File the appeal papers',
        explanation: 'The clerk is responsible for filing any appeal papers related to the probate ruling if a party contests the decision.',
        reference: 'Appeal Process in Probate, Section 8.1'
      },
      {
        question: 'What should the clerk do to confirm the validity of a will that was submitted for probate?',
        options: ['Obtain the death certificate', 'Verify signatures and witnesses', 'Review the final estate report', 'Notify the beneficiaries'],
        answer: 'Verify signatures and witnesses',
        explanation: 'The clerk must ensure that the will has been properly signed and witnessed according to legal requirements.',
        reference: 'Validating a Will, Section 3.5'
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
