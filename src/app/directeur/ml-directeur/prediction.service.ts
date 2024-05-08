import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }


  predictValue(nomJoueur: string): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:5000/predict_player_value', { player_name: nomJoueur });
  }
}
