import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';



export interface Tile {
  text: string;
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-lawyeraccess',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
  MatGridListModule],
  templateUrl: './lawyeraccess.component.html',
  styleUrl: './lawyeraccess.component.scss'
})
export class LawyeraccessComponent {
  // tiles: Tile[] = [
  //   {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  //   {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  //   {text: 'Five', cols: 1, rows: 1, color: '#ddb422'},
  // ];

  tiles: Tile[] = [
    { text: 'Home', color: '#aed581', cols: 1, rows: 1 },
    { text: 'Court', color: '#81d4fa', cols: 2, rows: 1 },
    { text: 'Calender', color: '#ffcc80', cols: 1, rows: 2 },
    { text: 'Judge', color: '#ffab91', cols: 2, rows: 2 },
    { text: 'Wet', color: '#80cbc4', cols: 1, rows: 2 },
    { text: 'Calendar', color: '#e6ee9c', cols: 1, rows: 3 },
    { text: 'Court', color: '#bcaaa4', cols: 3, rows: 1 }, 
  ];
}
