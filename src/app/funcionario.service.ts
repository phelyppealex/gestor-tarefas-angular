import { Injectable } from '@angular/core';
import { DadosFuncionario } from './dados-funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  readonly url = 'http://localhost:8080/funcionario/'

  async getFuncionarios(): Promise<DadosFuncionario[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
}
