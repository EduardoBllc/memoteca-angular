import { Component, OnInit } from '@angular/core';
import {PensamentoService} from "../pensamento.service";
import {Modelo} from "../pensamento";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { minusculoValidator } from './minusculoValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  constructor(
    private service:PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ])
      ],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator,
        ]),
      ],
      modelo: [Modelo.um],
      favorito: [false],
    });
  }

  formulario!: FormGroup;

  protected criarPensamento(): void {
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamentos'])
          .then( _ => alert('Pensamento criado com sucesso!'));
      });
    }
  }

  protected cancelar() : void {
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
