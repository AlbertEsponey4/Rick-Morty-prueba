
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private apiUrl = 'http://api.balldontlie.io/v1/teams';
  private apiKey = 'YOUR_API_KEY';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    // Crear el encabezado con la api key
    const headers = new HttpHeaders().set('Authorization', this.apiKey);
    return this.http.get<Team[]>(this.apiUrl, { headers });
  }
}

