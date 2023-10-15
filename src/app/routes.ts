import { Routes } from '@angular/router';
import { ListarTarefasComponent } from './listar-tarefas/listar-tarefas.component';
import { CadastrarTarefaComponent } from './cadastrar-tarefa/cadastrar-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';

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
    },
    {
        path: 'editar-tarefa/:id',
        component: EditarTarefaComponent,
        title: 'Editar Tarefa'
    }
];

export default routeConfig;