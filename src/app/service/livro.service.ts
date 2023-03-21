import { LivrosResultado } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado);

    // Pipe -> agrupar diversos tipos de operadores | Cano que passa o fluxo de informações e é onde serão aplicadas as transformações de dados
    return this.http.get<LivrosResultado>(this.API, { params });
  }
}
