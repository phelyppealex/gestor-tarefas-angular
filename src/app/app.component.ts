import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { CadastrarTarefaComponent } from './cadastrar-tarefa/cadastrar-tarefa.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ListarTarefasComponent,
    CadastrarTarefaComponent,
    RouterModule
  ],
  template: `
    <main>
      <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" [routerLink]="['/']" alt="Sistema de Gestão de Tarefas">SGT</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" [routerLink]="['/cadastrar-tarefa']">Cadastrar Tarefa</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown link
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tarefa-angular';
}
