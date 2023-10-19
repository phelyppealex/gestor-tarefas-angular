import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';
import { DadosFuncionario } from '../dados-funcionario';
import { DadosTarefaRequest } from '../dados-tarefa';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <h4>Cadastro de Tarefa</h4>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <div class="form-floating">
      <input type="text" class="form-control" name="" id="input-titulo" formControlName="inputTitulo">
      <label class="form-label" for="input-titulo">Título</label>
      </div>
      <br>

      <div class="form-floating">
      <input type="text" class="form-control" wrap="hard" name="" id="input-descricao" formControlName="inputDescricao">
      <label class="form-label" for="input-descricao">Descrição</label>
      </div>
      <br>

      <label class="form-label" for="input-prioridade">Prioridade</label><br>
      <select class="form-select" name="" id="input-prioridade" formControlName="inputPrioridade" required>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select><br>

      <div class="form-floating">
        <input type="date" class="form-control" name="" id="input-data" formControlName="inputData">
        <label class="form-label" for="input-data">Prazo</label>
      </div>
      <br>

      <label class="form-label" for="input-funcionario">Selecione o funcionário</label><br>
      <select class="form-select" name="" id="input-funcionario" formControlName="inputFuncionario">
        <option *ngFor="let func of funcionarios" value="{{ func.id }}">{{ func.nome }}</option>
      </select><br>

      <button class="btn btn-dark" type="submit">Cadastrar Tarefa</button><br>
    </form>
  `,
  styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent {
  funcionarioService = inject(FuncionarioService);
  funcionarios: DadosFuncionario[] = [];

  tarefaService = inject(TarefaService);
  tarefaRequest!: DadosTarefaRequest;
  
  aplicaForm = new FormGroup({
    inputTitulo: new FormControl(''),
    inputDescricao: new FormControl(''),
    inputPrioridade: new FormControl(''),
    inputData: new FormControl(''),
    inputFuncionario: new FormControl()
  });

  constructor(){
    this.funcionarioService.getFuncionarios().then((funcionarios: DadosFuncionario[]) => {
      this.funcionarios = funcionarios;
    });
  }

  submeterForm(){
    const campo = this.aplicaForm.value;

    this.tarefaRequest = {
      id: 0,
      titulo: campo.inputTitulo ?? '',
      descricao: campo.inputDescricao ?? '',
      prioridade: campo.inputPrioridade ?? '',
      status: 'Em andamento',
      prazo: campo.inputData ?? '',
      funcionario_id: campo.inputFuncionario
    };

    this.tarefaService.cadastrarTarefa(this.tarefaRequest);
  }
}