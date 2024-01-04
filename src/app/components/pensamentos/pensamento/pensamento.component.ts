import {Component, Input} from '@angular/core';
import {Modelo, Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent {

  constructor(private service: PensamentoService) {
  }

  @Input() pensamento: Pensamento = {
    id: 1,
    conteudo: "",
    autoria: "",
    modelo: Modelo.um,
    favorito: false,
  }

  @Input() listaFavoritos: Pensamento[] = [];

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  switchFavorito() : string {
    if(!this.pensamento.favorito){
      return "inativo";
    }
      return "ativo";
  }

  atualizarFavoritos() : void {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1);
    });
  }
}
