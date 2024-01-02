import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pensamento} from "./pensamento";

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = "http://localhost:3000/pensamento";

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean) : Observable<Pensamento[]> {
    const itemsPorPagina: number = 6;

    let params: HttpParams = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itemsPorPagina);

    if(filtro.trim().length > 2){
      params = params.set('q', filtro);
    }

    if(favoritos){
      params = params.set("favorito", true);
    }

    return this.http.get<Pensamento[]>(this.API, { params });
  }

  criar(pensamento: Pensamento) : Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  buscarPeloId(id: number) : Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  excluir(id: number) : Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  editar(pensamento: Pensamento) : Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento) : Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito;
    return this.editar(pensamento);
  }
}
