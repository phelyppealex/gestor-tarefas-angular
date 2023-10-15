import { Injectable } from '@angular/core';
import { DadosTarefaRequest, DadosTarefaResponse } from './dados-tarefa';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  readonly url = 'http://localhost:8080/tarefa/'
  router: Router;

  constructor(router: Router){
    this.router = router;
  }

  async getTarefas(): Promise<DadosTarefaResponse[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  cadastrarTarefa(dadosTarefa: DadosTarefaRequest){
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
    this.router.navigate(['']);
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