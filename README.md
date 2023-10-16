# Aplicação Exemplo Seleção

### As aplicações estão organizadas em repositórios no meu GitHub. Para visitá-los, navegue pelos links abaixo:

[Aplicação Back-End com Spring Boot](https://github.com/phelyppealex/gestor-tarefas-rest)

[Aplicação Front-End com Angular](https://github.com/phelyppealex/gestor-tarefas-angular)

## Orientações para rodar as aplicações em sua máquina

Primeiro certifique-se de ter baixado os dois projetos linkados anteriormente.

### Spring Boot
- Tenha o JDK 17 LTS instalado na sua máquina (a aplicação está configurada para rodar em java 11 no arquivo pom.xml)
- Tenha o servidor do PostgreSQL instalado em sua máquina (caso tenha docker, apenas instale a imagem do PostgreSQL com o comando `docker pull postgres` e rode o arquivo docker-compose.yml com o comando `docker-compose up -d` no terminal a partir do diretório raíz do projeto e pule os próximos passos que estão identados com tabulação):
    - A aplicação está configurada para acessar o banco na porta 5432 (porta padrão) e a senha está configurada como 1412. Sua senha provavelmente não é a mesma, então navegue até `src/main/resources`, abra o arquivo `application.yml` e mude a senha.
    - Você precisa criar o banco `gestao_tarefas` no seu servidor.
- Agora abra sua IDE favorita e rode a aplicação.

### Angular
- Tenha o Node.js instalado em sua máquina, abra o terminal no diretório do projeto e rode o seguinte comando no terminal:

~~~
ng serve
~~~

- Agora insira a url `http://localhost:4200/` no seu navegador e explore a aplicação.

## Como as requisições podem ser feitas?

As requisições podem ser feitas da seguinte maneira:


Funcionário POST
`http://localhost:8080/funcionario/`
~~~json
{
	"nome": "Anderson Costa",
	"telefone": "(84) 99410-3474",
	"email": "andersoncosta@gmail.com"
}
~~~
Tarefa POST
`http://localhost:8080/tarefa/`
~~~json
{
	"titulo": "Configurar os CORS",
	"descricao": "É preciso configurá-lo para poder comunicar com o front",
	"prioridade": "Média",
	"status": "Em andamento",
	"prazo": "2024-11-02",
	"funcionario_id": 1
}
~~~

## O que foi feito?

### Back-end
Do lado do back-end, foi desenvolvida uma aplicação com endpoints em REST, dividida em pacotes, os quais são: config, controller, repository, model e service. Foram pensados 2 modelos: funcionário e farefa que têm um relacionamento 1:N. Uma tarefa tem que ter obrigatóriamente 1 funcionário e um funcionário pode ter 0/N tarefas.

### Front-end
Do lado do front-end, foi desenvolvido uma aplicação para consumir a API, a qual tem um CRUD completo para tarefas e para funcionários só é possível cadastrar até o presente momento.

### Ítens concluídos
Dados os ítens dispostos no documento base os que foram concluídos até então, foram: a, b, c, e.