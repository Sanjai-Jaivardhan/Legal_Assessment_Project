import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { BehaviorSubject } from 'rxjs';

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

  sendTrackData(data: any) {
    const apiUrl = 'http://localhost:1000/client-bot-assess'; // Replace with your actual API URL
    return this.http.post(apiUrl, data);
  }
  
}
