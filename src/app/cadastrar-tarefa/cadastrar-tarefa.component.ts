import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ItemFuncionarioComponent } from '../item-funcionario/item-funcionario.component';
import { FuncionarioService } from '../funcionario.service';
import { DadosFuncionario } from '../dados-funcionario';
import { DadosTarefaRequest } from '../dados-tarefa';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ItemFuncionarioComponent,
    CommonModule
  ],
  template: `
    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="input-titulo">Título</label><br>
      <input type="text" name="" id="input-titulo" formControlName="inputTitulo"><br>

      <label for="input-descricao">Descrição</label><br>
      <input type="text" name="" id="input-descricao" formControlName="inputDescricao"><br>

      <label for="">Prioridade</label><br>
      <select name="" id="input-prioridade" formControlName="inputPrioridade">
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select><br>

      <label for="input-data">Prazo</label><br>
      <input type="date" name="" id="input-data" formControlName="inputData"><br>

      <label for="input-funcionario">Selecione o funcionário</label><br>
      <select name="" id="input-funcionario" formControlName="inputFuncionario">
        <option *ngFor="let func of dadosFuncionarioList" value="{{ func.id }}">{{ func.nome }}</option>
      </select><br>

      <button type="submit">Cadastrar Tarefa</button><br>
    </form>
  `,
  styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent {
  funcionarioService = inject(FuncionarioService);
  tarefaService = inject(TarefaService);
  dadosFuncionarioList: DadosFuncionario[] = [];
  aplicaForm = new FormGroup({
    inputTitulo: new FormControl(''),
    inputDescricao: new FormControl(''),
    inputPrioridade: new FormControl(''),
    inputData: new FormControl(''),
    inputFuncionario: new FormControl()
  });
  dadosTarefa!: DadosTarefaRequest;

  constructor(){
    this.funcionarioService.getFuncionarios().then((dadosFuncionario: DadosFuncionario[]) => {
      this.dadosFuncionarioList = dadosFuncionario;
    });
  }

  submeterForm(){
    const campo = this.aplicaForm.value;

    this.dadosTarefa = {
      id: 0,
      titulo: campo.inputTitulo ?? '',
      descricao: campo.inputDescricao ?? '',
      prioridade: campo.inputPrioridade ?? '',
      status: 'Em andamento',
      prazo: campo.inputData ?? '',
      funcionario_id: campo.inputFuncionario
    };

    console.log(this.dadosTarefa);
    
    this.tarefaService.cadastrarTarefa(this.dadosTarefa);
  }
}