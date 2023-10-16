import { Injectable } from '@angular/core';
import { DadosFuncionario } from './dados-funcionario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  readonly url = 'http://localhost:8080/funcionario/';
  router: Router;

  constructor(router: Router){
    this.router = router;
  }

  async getFuncionarios(): Promise<DadosFuncionario[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async cadastrarFuncionario(funcionario: DadosFuncionario){
    const data = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionario)
    }).then(
      (response) => {
        if(!response.ok){
          throw new Error('Erro ao cadastrar tarefa');
        }
      }
    );
    this.router.navigate(['']);
  }
}
