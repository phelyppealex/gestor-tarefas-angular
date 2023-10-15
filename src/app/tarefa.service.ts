import { Injectable } from '@angular/core';
import { DadosTarefaRequest, DadosTarefaResponse } from './dados-tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  url = 'http://localhost:8080/tarefa/'

  async getTarefas(): Promise<DadosTarefaResponse[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
