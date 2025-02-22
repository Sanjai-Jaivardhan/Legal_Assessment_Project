import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


export interface CourtFiling {
  caseNumber: string;
  caseTitle: string;
  filingDate: string;
  status: string;
}


const ELEMENT_DATA: CourtFiling[] = [
  { caseNumber: '2024TN001', caseTitle: 'Sundar Vs Rakesh', filingDate: '2024-01-15', status: 'Ongoing' },
  { caseNumber: '2024TN002', caseTitle: 'Anitha Vs Ajay', filingDate: '2024-02-10', status: 'Closed' },
  { caseNumber: '2024TN003', caseTitle: 'Vikram Vs Satheesh', filingDate: '2024-03-22', status: 'Pending' },
  { caseNumber: '2024TN004', caseTitle: 'Manoj Vs Devika', filingDate: '2024-04-05', status: 'Ongoing' },
  { caseNumber: '2024TN005', caseTitle: 'Krishna Vs Madhavan', filingDate: '2024-05-18', status: 'Closed' },
  { caseNumber: '2024TN006', caseTitle: 'Ravi Vs Archana', filingDate: '2024-06-10', status: 'Pending' },
  { caseNumber: '2024TN007', caseTitle: 'Kamala Vs Prabu', filingDate: '2024-07-02', status: 'Ongoing' },
  { caseNumber: '2024TN008', caseTitle: 'Ranjith Vs Santhosh', filingDate: '2024-07-25', status: 'Closed' },
  { caseNumber: '2024TN009', caseTitle: 'Mohan Vs Renuka', filingDate: '2024-08-12', status: 'Pending' },
  { caseNumber: '2024TN010', caseTitle: 'Aravind Vs Lavanya', filingDate: '2024-08-28', status: 'Ongoing' },
  { caseNumber: '2024TN011', caseTitle: 'Sanjay Vs Nandini', filingDate: '2024-09-05', status: 'Closed' },
  { caseNumber: '2024TN012', caseTitle: 'Ganesh Vs Vidya', filingDate: '2024-09-19', status: 'Pending' },
  { caseNumber: '2024TN013', caseTitle: 'Sakrat Vs Thyagarajan', filingDate: '2024-10-10', status: 'Ongoing' },
  { caseNumber: '2024TN014', caseTitle: 'Prema Vs Vivek', filingDate: '2024-10-25', status: 'Closed' },
  { caseNumber: '2024TN015', caseTitle: 'Parthiban Vs Gopalan', filingDate: '2024-11-14', status: 'Pending' },
  { caseNumber: '2024TN016', caseTitle: 'Chandran Vs Jayanthi', filingDate: '2024-11-28', status: 'Ongoing' },
  { caseNumber: '2024TN017', caseTitle: 'Nagaraj Vs Deepa', filingDate: '2024-12-05', status: 'Closed' },
  { caseNumber: '2024TN018', caseTitle: 'Akhilan Vs Anusha', filingDate: '2024-12-18', status: 'Pending' },
  { caseNumber: '2024TN019', caseTitle: 'Siva Vs Premalatha', filingDate: '2025-01-07', status: 'Ongoing' },
  { caseNumber: '2024TN020', caseTitle: 'Rajesh Vs Sumithra', filingDate: '2025-01-20', status: 'Closed' }

];


@Component({
  selector: 'app-courtfilings',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatCardModule,MatIconModule,MatToolbarModule,MatButtonModule,MatInputModule,FormsModule],
  templateUrl: './courtfilings.component.html',
  styleUrl: './courtfilings.component.scss'
})
export class CourtfilingsComponent {
  title = 'Court Case Filings';
  searchQuery = '';

  displayedColumns: string[] = ['caseNumber', 'caseTitle', 'filingDate', 'status'];
  dataSource = ELEMENT_DATA;

  get filteredCases() {
    return this.dataSource.filter(c => 
      c.caseNumber.includes(this.searchQuery) || 
      c.caseTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.filingDate.includes(this.searchQuery) ||
     
      c.status.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
