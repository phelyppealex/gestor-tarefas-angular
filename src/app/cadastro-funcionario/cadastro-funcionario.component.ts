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
    <form [formGroup]="aplicarForm" (submit)="submeterForm()">
      <label for="input-nome">Nome</label><br>
      <input type="text" id="input-nome" formArrayName="inputNome"><br>

      <label for="input-email" >Email</label><br>
      <input type="email" id="input-email" formArrayName="inputEmail"><br>

      <label for="input-telefone" >Telefone</label><br>
      <input type="text" id="input-telefone" formArrayName="inputTelefone"><br>

      <button type="submit">Cadastrar Funcionário</button>
    </form>
  `,
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent {
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

    this.funcionarioService.cadastrarFuncionario(this.dadosFuncionario);
  }
}