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
    MatOptionModule
  ],
  templateUrl: './clientdocument.component.html',
  styleUrl: './clientdocument.component.scss'
})
export class ClientdocumentComponent {
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
}
