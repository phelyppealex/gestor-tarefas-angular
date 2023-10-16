import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DadosFuncionario } from '../dados-funcionario';
import { FuncionarioService } from '../funcionario.service';

@Component({
  selector: 'app-cadastro-funcionario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <h4>Cadastro de Funcionário</h4>

    <form [formGroup]="aplicarForm" (submit)="submeterForm()">
      <div class="form-floating">
        <input class="form-control" type="text" id="input-nome" formControlName="inputNome">
        <label for="input-nome">Nome</label>
      </div>
      <br>

      <div class="form-floating">
        <input class="form-control" type="email" id="input-email" formControlName="inputEmail">
        <label for="input-email" >Email</label>
      </div>
      <br>

      <div class="form-floating">
        <input class="form-control" type="text" id="input-telefone" formControlName="inputTelefone">
        <label for="input-telefone" >Telefone</label>
      </div>
      <br>

      <button class="btn btn-dark" type="submit">Cadastrar Funcionário</button>
    </form>
  `,
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent {
  funcionarioService = inject(FuncionarioService);
  dadosFuncionario!: DadosFuncionario;
  aplicarForm = new FormGroup({
    inputNome: new FormControl(''),
    inputEmail: new FormControl(''),
    inputTelefone: new FormControl('')
  });

  submeterForm(){
    const campo = this.aplicarForm.value;

    this.dadosFuncionario = {
      id: 0,
      nome: campo.inputNome ?? '',
      email: campo.inputEmail ?? '',
      telefone: campo.inputTelefone ?? ''
    };
    console.log(this.dadosFuncionario);
    this.funcionarioService.cadastrarFuncionario(this.dadosFuncionario);
  }
}