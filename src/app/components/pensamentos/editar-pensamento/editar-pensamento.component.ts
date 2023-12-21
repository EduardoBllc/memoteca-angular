import { Component, OnInit } from '@angular/core';
import {Pensamento, Modelo} from "../pensamento";
import {ActivatedRoute, Router} from "@angular/router";
import {PensamentoService} from "../pensamento.service";

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPeloId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: Modelo.um,
  }

  editarPensamento(){
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamentos']);
    });
  }

  cancelar() : void {
    this.router.navigate(['/listarPensamentos']);
  }
}
