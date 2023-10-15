import { Routes } from '@angular/router';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { CadastrarTarefaComponent } from './cadastrar-tarefa/cadastrar-tarefa.component';

const routeConfig: Routes = [
    {
        path: '',
        component: ListarTarefasComponent,
        title: 'Página Inicial'
    },
    {
        path: 'cadastrar-tarefa',
        component: CadastrarTarefaComponent,
        title: 'Cadastrar Tarefa'
    }
];

export default routeConfig;