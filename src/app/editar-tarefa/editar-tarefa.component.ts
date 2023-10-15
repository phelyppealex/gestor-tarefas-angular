import { Component, inject } from '@angular/core';
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
    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="input-titulo">Título</label><br>
      <input type="text" name="" id="input-titulo" formControlName="inputTitulo" [(ngModel)]="dadoTarefa.titulo"><br>

      <label for="input-descricao">Descrição</label><br>
      <input type="text" name="" id="input-descricao" formControlName="inputDescricao" [(ngModel)]="dadoTarefa.descricao"><br>

      <label for="">Prioridade</label><br>
      <select [(ngModel)]="dadoTarefa.prioridade" name="" id="input-prioridade" formControlName="inputPrioridade">
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select><br>

      <label for="input-data">Prazo</label><br>
      <input type="date" name="" id="input-data" [(ngModel)]="dadoTarefa.prazo" formControlName="inputData"><br>

      <label for="input-funcionario">O responsável atualmente é <b>{{ dadoTarefa.funcionario.nome }}</b>, você pode alterar no campo abaixo:</label><br>
      <select name="" id="input-funcionario" formControlName="inputFuncionario">
        <option *ngFor="let func of dadosFuncionarioList" value="{{ func.id }}">{{ func.nome }}</option>
      </select><br>

      <button type="submit">Editar Tarefa</button><br>
    </form>
  `,
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tarefaService: TarefaService = inject(TarefaService);
  funcionarioService: FuncionarioService = inject(FuncionarioService);
  dadosFuncionarioList: DadosFuncionario[] = [];
  readonly pathParam: number;
  dadoTarefa!: DadosTarefaResponse;
  aplicaForm = new FormGroup({
    inputId: new FormControl(0),
    inputTitulo: new FormControl(''),
    inputDescricao: new FormControl(''),
    inputPrioridade: new FormControl(''),
    inputData: new FormControl(''),
    inputFuncionario: new FormControl()
  });

  constructor(){
    this.pathParam = Number(this.route.snapshot.params['id']);
    this.tarefaService.getTarefaById(this.pathParam).then((dadoTarefa: DadosTarefaResponse) => {
      this.dadoTarefa = dadoTarefa;
    });
    this.funcionarioService.getFuncionarios().then((dadosFuncionarioList: DadosFuncionario[]) => {
      this.dadosFuncionarioList = dadosFuncionarioList;
    });
  }

  submeterForm(){
    const campo = this.aplicaForm.value;

    let dadosTarefaAtualizado: DadosTarefaRequest = {
      id: this.pathParam,
      titulo: campo.inputTitulo ?? '',
      descricao: campo.inputDescricao ?? '',
      prioridade: campo.inputPrioridade ?? '',
      status: 'Em andamento',
      prazo: campo.inputData ?? '',
      funcionario_id: campo.inputFuncionario
    };

    this.tarefaService.atualizar(dadosTarefaAtualizado);
  }
}