import { Injectable } from '@angular/core';
import { DadosTarefaRequest, DadosTarefaResponse } from './dados-tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  readonly url = 'http://localhost:8080/tarefa/'

  async getTarefas(): Promise<DadosTarefaResponse[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async cadastrarTarefa(dadosTarefa: DadosTarefaRequest){
    fetch(this.url,{
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
  }
}
