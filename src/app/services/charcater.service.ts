import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Character } from '../interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharcaterService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Character[]> {
    let nextPage = 1;

    const fetchPage = (page: number): Observable<Character[]> =>
      this.http.get<any>(`${this.apiUrl}/character?page=${page}`).pipe(
        map((response: any) => ({
          nextPage: response.info.next ? page + 1 : null,
          results: response.results.map((result: any) => ({
            id: result.id,
            name: result.name,
            status: result.status,
            species: result.species,
            image: result.image,
            episode: result.episode
          }))
        })),
        switchMap(({ nextPage: nextPageToFetch, results }) =>
          nextPageToFetch ? fetchPage(nextPageToFetch).pipe(map(newResults => [...results, ...newResults])) : of(results)
        ),
        catchError(error => {
          console.error('Error fetching characters:', error);
          return of([]);
        })
      );

    return fetchPage(nextPage);
  }
}
