import { DadosFuncionario } from "./dados-funcionario";

export interface DadosTarefaRequest {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
    prazo: string;
    funcionario_id: number;
}

export interface DadosTarefaResponse {
    id: number;
    titulo: string;
    descricao: string;
    prioridade: string;
    status: string;
    prazo: string;
    funcionario: DadosFuncionario;
}