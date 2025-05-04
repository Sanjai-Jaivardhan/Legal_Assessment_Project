import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assess-judicial-page',
  standalone: true,
  imports: [ MatCardModule,MatGridListModule],
  templateUrl: './assess-judicial-page.component.html',
  styleUrl: './assess-judicial-page.component.scss'
})
export class AssessJudicialPageComponent {
 
    constructor(private router: Router) {}
  
    openExternalLink(url: string) {
      window.open(url, '_blank');
    }
    goBack(): void {
      window.history.back();
    }
  }
  

