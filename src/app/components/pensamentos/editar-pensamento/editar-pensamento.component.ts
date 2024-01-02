import { Component, OnInit } from '@angular/core';
import {Pensamento, Modelo} from "../pensamento";
import {ActivatedRoute, Router} from "@angular/router";
import {PensamentoService} from "../pensamento.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPeloId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo],
        favorito: pensamento.favorito,
      })
    })
  }


  formulario! : FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: Modelo.um,
    favorito: false,
  }

  editarPensamento(){
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamentos']);
    });
  }

  cancelar() : void {
    this.router.navigate(['/listarPensamentos']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid){
      return 'botao';
    }else{
      return 'botao__desabilitado';
    }
  }
}
