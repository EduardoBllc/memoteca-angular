import { Component, OnInit } from '@angular/core';
import {Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = "";
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];


  constructor( private service: PensamentoService) { }

  ngOnInit(){
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() : void {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos => {
          this.listaPensamentos.push(...listaPensamentos);
          if(!listaPensamentos.length){
            this.haMaisPensamentos = false;
          }
        })
    );
  }

  pesquisarPensamentos() : void {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  pesquisarFavoritos() : void {
    this.favoritos = true;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos;
        this.listaFavoritos = listaPensamentos;
      });
  }

  entrarFavoritos() : void {
    this.favoritos = true;
    this.pesquisarPensamentos();
  }

  entrarMural() : void {
    this.favoritos = false;
    this.pesquisarPensamentos();
  }
}
