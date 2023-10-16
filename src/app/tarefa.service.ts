import { Injectable } from '@angular/core';
import { DadosTarefaRequest, DadosTarefaResponse } from './dados-tarefa';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  readonly url = 'http://localhost:8080/tarefa/'
  router: Router;
  dadoTarefa!: DadosTarefaResponse;

  constructor(router: Router){
    this.router = router;
  }

  async getTarefas(): Promise<DadosTarefaResponse[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getTarefaById(id: number): Promise<DadosTarefaResponse> {
    const data = await fetch(`${this.url}${id}`);
    return await data.json();
  }

  async cadastrarTarefa(dadosTarefa: DadosTarefaRequest){
    const data = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosTarefa)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar tarefa');
        }
      }
    );
    this.router.navigate(['']);
  }

  async atualizar(dadosTarefa: DadosTarefaRequest){
    const data = await fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosTarefa)
    });
    this.router.navigate(['']);
  }

  async concluirTarefa(id: number){
    const data = await fetch(`${this.url}${id}`);
    const tarefa = await data.json();
    const tarefaConcluida: DadosTarefaRequest = {
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      prioridade: tarefa.prioridade,
      status: 'Concluída',
      prazo: tarefa.prazo,
      funcionario_id: tarefa.funcionario.id
    };
    const data1 = await fetch(this.url,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefaConcluida)
    });
  }

  async deleteById(id: number){
    const data = await fetch(`${this.url}${id}`,{
      method: 'DELETE',
    }).then(
      (response) => {
        console.log(response);
        if(!response.ok){
          throw new Error('Erro ao deletar tarefa');
        }
      }
    );
  }
}