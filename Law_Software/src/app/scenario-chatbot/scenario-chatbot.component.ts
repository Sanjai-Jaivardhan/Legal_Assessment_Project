import { Component ,Inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-scenario-chatbot',
  standalone: true,
  imports: [MatCardModule,MatInputModule,CommonModule,FormsModule,MatIconModule,MatToolbarModule],
  templateUrl: './scenario-chatbot.component.html',
  styleUrl: './scenario-chatbot.component.scss'
})
export class ScenarioChatbotComponent {


  
  
}
