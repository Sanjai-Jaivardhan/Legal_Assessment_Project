import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-court-officer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './court-officer.component.html',
  styleUrl: './court-officer.component.scss'
})
export class CourtOfficerComponent {
  searchText = '';

  officers = [
    {
      name: 'Ravi Kumar',
      designation: 'Court Liaison Officer',
      id: 'CO-1023',
      email: 'ravi.kumar@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
    },
    {
      name: 'Priya Sharma',
      designation: 'Legal Advisor',
      id: 'CO-1024',
      email: 'priya@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    {
      name: 'Anil Verma',
      designation: 'Judicial Assistant',
      id: 'CO-1025',
      email: 'anil.verma@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/2922/2922522.png'
    },
    {
      name: 'Meena Iyer',
      designation: 'Senior Legal Analyst',
      id: 'CO-1026',
      email: 'meena.iyer@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png'
    },
    {
      name: 'Sunil Desai',
      designation: 'Court Records Officer',
      id: 'CO-1027',
      email: 'sunil.desai@lawaccess.org',
        image: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png',
    },
    {
      name: 'Kavitha Menon',
      designation: 'Legal Researcher',
      id: 'CO-1028',
      email: 'kavitha.menon@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'
    },
    {
      name: 'Amit Chawla',
      designation: 'Case Manager',
      id: 'CO-1029',
      email: 'amit.chawla@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135711.png'
    },
    {
      name: 'Sneha Rao',
      designation: 'Dispute Mediator',
      id: 'CO-1030',
      email: 'sneha.rao@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/2922/2922656.png'
    },
    {
      name: 'Rahul Mehta',
      designation: 'Court Assistant',
      id: 'CO-1031',
      email: 'rahul.mehta@lawaccess.org',
      image: 'https://cdn-icons-png.flaticon.com/512/3048/3048124.png'
    }
  ];

  get filteredOfficers() {
    return this.officers.filter(officer =>
      officer.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      officer.designation.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
