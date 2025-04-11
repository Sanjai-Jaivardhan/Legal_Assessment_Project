import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Define the interface for track data related to ending the test
interface EndTestData {
  track_id: string;
  track_time: string;
  track_date: string;
  test_id: string;
  test_score: number;
  test_feedback: string;
}

// Define the response interface
interface EndTestResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  private api = 'http://localhost:1000';

  constructor(private http: HttpClient) { }

  scenariodetails(): Observable<any> {
    return this.http.get<any>(`${this.api}/individualscenario`);
  }

  allDetails(scenarioId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/allscenario/${scenarioId}`);
  }

  courtDetails(): Observable<any> {
    return this.http.get<any>(`${this.api}/courtDetails`);
  }

  // Send tracking data (previous method)
  sendTrackData(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/api/client-bot-assess`, data);
  }

  // Send test assessment data
  endTest(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/api/end-test-assess`, data);
  }

  getTestResults(userId: string): Observable<any> {
    return this.http.get(`${this.api}/test-results/${userId}`);
  }
  
  submitClerkDetails(data: any): Observable<any> {
    return this.http.post(`${this.api}/clerk-details`, data);
  }
  incrementFilingCount(): Observable<any> {
    return this.http.post(`${this.api}/api/increment-filing-count`, {});
  }
  
  
}
