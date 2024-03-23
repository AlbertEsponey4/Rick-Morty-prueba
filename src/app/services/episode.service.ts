
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Episode } from '../interfaces/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<Episode[]> {
    return this.http.get<any>(this.apiUrl + '/episode').pipe(
      map((response: any) => {
        return response.results.map((result: any) => {
          return {
            id: result.id,
            episode: result.episode,
            name: result.name
          };
        });
      })
    );
  }
}

