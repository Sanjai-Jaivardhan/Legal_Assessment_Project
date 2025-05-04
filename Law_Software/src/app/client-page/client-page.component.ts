import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss'
})
export class ClientPageComponent {
  goBack(): void {
    window.history.back();
  }
}
