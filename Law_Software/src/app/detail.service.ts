import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { BehaviorSubject } from 'rxjs';
interface TrackData {
  track_id: string;
  track_time: string;
  track_date: string;
  chat_button_id: string;
  chat_id: string;
  chat_values: string;
}

// Define the response interface
interface TrackResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private api='http://localhost:1000'

  constructor(private http:HttpClient) { }

  scenariodetails():Observable<any>{
    return this.http.get<any>(`${this.api}/individualscenario`)
  }

  allDetails(scenarioId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/allscenario/${scenarioId}`);
  }

  courtDetails():Observable<any>{
    return this.http.get<any>(`${this.api}/courtDetails`)
  }

  // Define the interface for the track data


  sendTrackData(data: TrackData): Observable<TrackResponse> {
    return this.http.post<TrackResponse>(`${this.api}/api/client-bot-assess`, data);
  }
  
}
