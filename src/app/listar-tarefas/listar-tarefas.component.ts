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
          <option value="{{ func.id }}" *ngFor="let func of funcionarios">{{ func.nome }}</option>
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
        <tr *ngFor="let dadoTarefa of filteredTarefasResponse">
          <td>{{ dadoTarefa.id }}</td>
          <td>{{ dadoTarefa.titulo }}</td>
          <td>{{ dadoTarefa.funcionario.nome }}</td>
          <td>{{ dadoTarefa.status }}</td>
          <td>
            <a href="/" (click)="deletar(dadoTarefa.id)">
              <button class="btn btn-secondary">Deletar</button>
            </a>
            <a href="/editar-tarefa/{{ dadoTarefa.id }}">
              <button class="btn btn-secondary">Editar</button>
            </a>
            <a href="#" (click)="concluirTarefa(dadoTarefa.id)">
              <button class="btn btn-secondary">Concluir</button>
            </a>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Detalhes
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">{{ dadoTarefa.titulo }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <h6>Descrição:</h6>
                    <p>{{ dadoTarefa.descricao }}</p><br>
                    <h6>Prioridade:</h6>
                    <p>{{ dadoTarefa.prioridade }}</p><br>
                    <h6>Status:</h6>
                    <p>{{ dadoTarefa.status }}</p><br>
                    <h6>Prazo:</h6>
                    <p>{{ dadoTarefa.prazo }}</p><br>
                    <h6>Responsável:</h6>
                    <p>{{ dadoTarefa.funcionario.nome }}</p><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent {
  funcionarioService: FuncionarioService = inject(FuncionarioService);
  funcionarios: DadosFuncionario[] = [];

  tarefaService: TarefaService = inject(TarefaService);
  tarefasResponse: DadosTarefaResponse[] = [];
  filteredTarefasResponse: DadosTarefaResponse[] = [];

  aplicarForm = new FormGroup({
    inputId: new FormControl(0),
    inputDescricao: new FormControl(''),
    inputStatus: new FormControl(''),
    inputFuncionario: new FormControl(0)
  });
  
  constructor(){
    this.tarefaService.getTarefas().then((dadosTarefa: DadosTarefaResponse[]) => {
      this.tarefasResponse = dadosTarefa;
      this.filteredTarefasResponse = this.tarefasResponse;
    });
    
    this.funcionarioService.getFuncionarios().then((funcionarios: DadosFuncionario[]) => {
      this.funcionarios = funcionarios;
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
    this.filteredTarefasResponse = this.tarefasResponse;

    if(campo.inputId != 0){
      this.filteredTarefasResponse = this.filteredTarefasResponse.filter(
        filteredTarefaResponse => filteredTarefaResponse.id == campo.inputId
      );
    }
    if(campo.inputFuncionario != 0){
      this.filteredTarefasResponse = this.filteredTarefasResponse.filter(
        filteredTarefaResponse => filteredTarefaResponse.funcionario.id == campo.inputFuncionario
      );
    }
    if(campo.inputDescricao != ''){
      this.filteredTarefasResponse = this.filteredTarefasResponse.filter(
        filteredTarefaResponse => filteredTarefaResponse.titulo.toLowerCase().includes(campo.inputDescricao!.toLowerCase()) || filteredTarefaResponse.descricao.toLowerCase().includes(campo.inputDescricao!.toLowerCase())
      );
    }
    if(campo.inputStatus != ''){
      this.filteredTarefasResponse = this.filteredTarefasResponse.filter(
        filteredTarefaResponse => filteredTarefaResponse.status.toLowerCase().includes(campo.inputStatus!.toLowerCase())
      );
    }
  }
}