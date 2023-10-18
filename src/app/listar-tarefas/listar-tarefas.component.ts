import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../tarefa.service';
import { DadosTarefaResponse } from '../dados-tarefa';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from '../funcionario.service';
import { DadosFuncionario } from '../dados-funcionario';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
    <section class="filtro">
      <h4>Filtrar tarefas</h4>

      <form [formGroup]="aplicarForm" (submit)="filtrarResultados()">
        <div class="form-floating">
          <input type="text" class="form-control" id="input-id" formControlName="inputId">
          <label class="form-label" for="input-id">ID</label>
        </div>
        <br>

        <div class="form-floating">
          <input type="text" class="form-control" wrap="hard" name="" id="input-descricao" formControlName="inputDescricao">
          <label class="form-label" for="input-descricao">Título/Descrição</label>
        </div>
        <br>

        <label class="form-label" for="input-funcionario">Responsável: </label><br>
        <select class="form-select" name="" id="input-funcionario" formControlName="inputFuncionario">
          <option value="{{ func.id }}" *ngFor="let func of dadosFunionarioList">{{ func.nome }}</option>
        </select><br>

        <label class="form-label" for="input-status">Status: </label><br>
        <select class="form-select" name="" id="input-status" formControlName="inputStatus">
          <option value="Em andamento">Em andamento</option>
          <option value="Concluída">Concluída</option>
        </select><br>

        <button class="btn btn-dark" type="submit">Aplicar</button> <button class="btn btn-secondary" (click)="resetarFiltro()">Resetar</button> <br><br>
      </form>
    </section>

    <h4>Lista de tarefas</h4>
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <td>ID</td>
          <td>Título</td>
          <td>Responsável</td>
          <td>Status</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let dadoTarefa of filteredDadosTarefaList">
          <td>{{ dadoTarefa.id }}</td>
          <td>{{ dadoTarefa.titulo }}</td>
          <td>{{ dadoTarefa.funcionario.nome }}</td>
          <td>{{ dadoTarefa.status }}</td>
          <td>
            <a href="/" (click)="deletar(dadoTarefa.id)">Deletar</a>|
            <a href="/editar-tarefa/{{ dadoTarefa.id }}">Editar</a>|
            <a href="#" (click)="concluirTarefa(dadoTarefa.id)">Concluir</a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent {
  funcionarioService: FuncionarioService = inject(FuncionarioService);
  dadosFunionarioList: DadosFuncionario[] = [];
  tarefaService: TarefaService = inject(TarefaService);
  dadosTarefaList: DadosTarefaResponse[] = [];
  filteredDadosTarefaList: DadosTarefaResponse[] = [];
  aplicarForm = new FormGroup({
    inputId: new FormControl(0),
    inputDescricao: new FormControl(''),
    inputStatus: new FormControl(''),
    inputFuncionario: new FormControl(0)
  });
  

  constructor(){
    this.tarefaService.getTarefas().then((dadosTarefa: DadosTarefaResponse[]) => {
      this.dadosTarefaList = dadosTarefa;
      this.filteredDadosTarefaList = this.dadosTarefaList;
    });
    
    this.funcionarioService.getFuncionarios().then((dadosFuncionario: DadosFuncionario[]) => {
      this.dadosFunionarioList = dadosFuncionario;
    });
  }

  deletar(id: number){
    if(window.confirm('Tem certeza que deseja deletar a tarefa?')){
      this.tarefaService.deleteById(id);
    }
  }

  concluirTarefa(id: number){
    this.tarefaService.concluirTarefa(id);
  }

  resetarFiltro(){
    let campo = this.aplicarForm.value;
    campo.inputId = 0;
    campo.inputDescricao = '';
    campo.inputStatus = '';
    campo.inputFuncionario = 0;

    this.filtrarResultados();
  }
  
  filtrarResultados(){
    const campo = this.aplicarForm.value;
    this.filteredDadosTarefaList = this.dadosTarefaList;

    if(campo.inputId != 0){
      this.filteredDadosTarefaList = this.filteredDadosTarefaList.filter(
        filteredDadosTarefa => filteredDadosTarefa.id == campo.inputId
      );
    }
    if(campo.inputFuncionario != 0){
      this.filteredDadosTarefaList = this.filteredDadosTarefaList.filter(
        filteredDadosTarefa => filteredDadosTarefa.funcionario.id == campo.inputFuncionario
      );
    }
    if(campo.inputDescricao != ''){
      this.filteredDadosTarefaList = this.filteredDadosTarefaList.filter(
        filteredDadosTarefa => filteredDadosTarefa.titulo.toLowerCase().includes(campo.inputDescricao!.toLowerCase()) || filteredDadosTarefa.descricao.toLowerCase().includes(campo.inputDescricao!.toLowerCase())
      );
    }
    if(campo.inputStatus != ''){
      this.filteredDadosTarefaList = this.filteredDadosTarefaList.filter(
        filteredDadosTarefa => filteredDadosTarefa.status.toLowerCase().includes(campo.inputStatus!.toLowerCase())
      );
    }
  }
}