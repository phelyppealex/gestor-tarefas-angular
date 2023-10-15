import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../tarefa.service';
import { DadosTarefaResponse } from '../dados-tarefa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
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
        <tr *ngFor="let dadoTarefa of dadosTarefaList">
          <td>{{ dadoTarefa.id }}</td>
          <td>{{ dadoTarefa.titulo }}</td>
          <td>{{ dadoTarefa.funcionario.nome }}</td>
          <td>{{ dadoTarefa.status }}</td>
          <td>
            <a href="/" (click)="deletar(dadoTarefa.id)">Deletar</a>|
            <a href="/editar-tarefa/{{ dadoTarefa.id }}">Editar</a>|
            <a href="/" (click)="concluir(dadoTarefa.id)">Concluir</a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent {
  tarefaService: TarefaService = inject(TarefaService);
  dadosTarefaList: DadosTarefaResponse[] = [];
  

  constructor(){
    this.tarefaService.getTarefas().then((dadosTarefa: DadosTarefaResponse[]) => {
      this.dadosTarefaList = dadosTarefa;
    });
  }

  deletar(id: number){
    if(window.confirm('Tem certeza que deseja deletar a tarefa?')){
      this.tarefaService.deleteById(id);
    }
  }

  concluir(id: number){
    this.tarefaService.concluirTarefa(id);
  }
}
