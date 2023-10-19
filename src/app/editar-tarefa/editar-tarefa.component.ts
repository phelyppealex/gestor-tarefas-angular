import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../tarefa.service';
import { DadosTarefaRequest, DadosTarefaResponse } from '../dados-tarefa';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { DadosFuncionario } from '../dados-funcionario';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-editar-tarefa',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <h4>Editar tarefa</h4>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <div class="form-floating">
        <input type="text" class="form-control" name="" id="input-titulo" formControlName="inputTitulo" [(ngModel)]="tarefaResponse.titulo">
        <label class="form-label" for="input-titulo">Título</label>
      </div>
      <br>

      <div class="form-floating">
        <input type="text" class="form-control" wrap="hard" name="" id="input-descricao" formControlName="inputDescricao" [(ngModel)]="tarefaResponse.descricao">
        <label class="form-label" for="input-descricao">Descrição</label>
      </div>
      <br>

      <label class="form-label" for="input-status">Status</label>
      <select class="form-select" [(ngModel)]="tarefaResponse.status" id="input-status" formControlName="inputStatus">
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
      </select>

      <label class="form-label" for="">Prioridade</label><br>
      <select class="form-select" [(ngModel)]="tarefaResponse.prioridade" name="" id="input-prioridade" formControlName="inputPrioridade">
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select><br>

      <label class="form-label" for="input-data">Prazo</label><br>
      <input type="date" class="form-control" name="" id="input-data" [(ngModel)]="tarefaResponse.prazo" formControlName="inputData"><br>

      <label class="form-label" for="input-funcionario">O responsável atualmente é <b>{{ tarefaResponse.funcionario.nome }}</b>, você pode alterar no campo abaixo:</label><br>
      <select class="form-select" name="" id="input-funcionario" formControlName="inputFuncionario" required>
        <option *ngFor="let func of funcionarios" value="{{ func.id }}">{{ func.nome }}</option>
      </select><br>

      <button class="btn btn-dark" type="submit">Editar Tarefa</button><br>
    </form>
  `,
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent{
  route: ActivatedRoute = inject(ActivatedRoute);
  readonly pathParam: number;

  tarefaService: TarefaService = inject(TarefaService);
  tarefaResponse!: DadosTarefaResponse;

  funcionarioService: FuncionarioService = inject(FuncionarioService);
  funcionarios: DadosFuncionario[] = [];
  
  aplicaForm = new FormGroup({
    inputId: new FormControl(0),
    inputTitulo: new FormControl(''),
    inputDescricao: new FormControl(''),
    inputPrioridade: new FormControl(''),
    inputData: new FormControl(''),
    inputFuncionario: new FormControl(0),
    inputStatus: new FormControl('')
  });

  constructor(){
    this.pathParam = Number(this.route.snapshot.params['id']);
    this.tarefaService.getTarefaById(this.pathParam).then((tarefaResponse: DadosTarefaResponse) => {
      this.tarefaResponse = tarefaResponse;
    });
    this.funcionarioService.getFuncionarios().then((funcionarios: DadosFuncionario[]) => {
      this.funcionarios = funcionarios;
    });
  }

  submeterForm(){
    const campo = this.aplicaForm.value;
    if(campo.inputFuncionario == 0){
      alert('Você precisa selecionar um funcionário');
    }else{
      let tarefaRequest: DadosTarefaRequest = {
        id: this.pathParam,
        titulo: campo.inputTitulo ?? '',
        descricao: campo.inputDescricao ?? '',
        prioridade: campo.inputPrioridade ?? '',
        status: campo.inputStatus ?? '',
        prazo: campo.inputData ?? '',
        funcionario_id: campo.inputFuncionario ?? 0
      };

      this.tarefaService.atualizar(tarefaRequest);
    }
  }
}