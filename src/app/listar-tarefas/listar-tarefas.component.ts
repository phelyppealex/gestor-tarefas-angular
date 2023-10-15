import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../tarefa.service';
import { DadosTarefaResponse } from '../dados-tarefa';
import { ItemTarefaComponent } from '../item-tarfa/item-tarefa.component';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    ItemTarefaComponent
  ],
  template: `
    <div class="container text-center">
      <div class="row align-items-end">
        <div class="col">
          ID
        </div>
        <div class="col">
          Titulo
        </div>
        <div class="col">
          Responsável
        </div>
        <div class="col">
          Ações
        </div>
      </div>
      <app-item-tarefa
        *ngFor="let dadoTarefa of dadosTarefaList"
        [dadosTarefa]="dadoTarefa"
      ></app-item-tarefa>
    </div>
    
  `,
  styleUrls: ['./listar-tarefas.component.css']
})
export class ListarTarefasComponent {
  tarefaService: TarefaService = inject(TarefaService);
  dadosTarefaList: DadosTarefaResponse[] = [];

  constructor(){
    this.tarefaService.getTarefas()
    .then(
      (dadosTarefa: DadosTarefaResponse[]) => {
        this.dadosTarefaList = dadosTarefa;
        console.log(this.dadosTarefaList);
      }
    );
  }
}
