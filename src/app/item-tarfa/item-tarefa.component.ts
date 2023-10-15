import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosTarefaResponse } from '../dados-tarefa';

@Component({
  selector: 'app-item-tarefa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row align-items-end">
      <div class="col">{{ dadosTarefa.id }}</div>
      <div class="col">{{ dadosTarefa.titulo }}</div>
      <div class="col">{{ dadosTarefa.funcionario.nome }}</div>
      <div class="col">
        <a href="">Excluir</a>|<a href="">Editar</a>|<a href="">Concluir</a>
      </div>
    </div>
  `,
  styleUrls: ['./item-tarefa.component.css']
})
export class ItemTarefaComponent {
  @Input() dadosTarefa!: DadosTarefaResponse;
}