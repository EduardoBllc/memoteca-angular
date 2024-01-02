import {Component, OnInit} from '@angular/core';
import {Modelo, Pensamento} from "../pensamento";
import {PensamentoService} from "../pensamento.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: Modelo.um,
    favorito: false,
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.service.buscarPeloId(parseInt(id!)).subscribe((pensamento) => {
        this.pensamento = pensamento;
      });
    }

  excluirPensamento() : void {
    if(this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/listarPensamentos']);
      });
    }
  }

  cancelar() : void {
    this.router.navigate(['/listarPensamentos']);
  }
}
