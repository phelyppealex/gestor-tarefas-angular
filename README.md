# Aplicação Gestora de tarefas

### As aplicações estão organizadas em repositórios no meu GitHub. Para visitá-los, navegue pelos links abaixo:

[Aplicação Back-End com Spring Boot](https://github.com/phelyppealex/gestor-tarefas-rest)

[Aplicação Front-End com Angular](https://github.com/phelyppealex/gestor-tarefas-angular)

## Orientações para rodar as aplicações em sua máquina

Primeiro certifique-se de ter baixado os dois projetos linkados anteriormente.

### Spring Boot
- Tenha o JDK 21 LTS instalado na sua máquina (a aplicação está configurada para rodar em java 11 no arquivo pom.xml)
- Tenha o servidor do PostgreSQL instalado em sua máquina (caso tenha docker, apenas instale a imagem do PostgreSQL com o comando `docker pull postgres` e rode o arquivo docker-compose.yml com o comando `docker compose up -d` (ou `docker-compose up -d` caso utilizando a versão antiga) no terminal a partir do diretório raíz do projeto e pule os próximos passos que estão identados com tabulação):
    - A aplicação está configurada para acessar o banco na porta 5432 (porta padrão) e a senha está configurada como 1412. Sua senha provavelmente não é a mesma, então navegue até `src/main/resources`, abra o arquivo `application.yml` e mude a senha.
    - Você precisa criar o banco `gestao_tarefas` no seu servidor.
- Agora abra sua IDE favorita e rode a aplicação.

### Angular
- Tenha o Node.js instalado em sua máquina.

- Abra o terminal no diretório do projeto e instale as dependências com o comando abaixo:

~~~
npm install
~~~

- Instale agora o Angular CLI:

~~~
npm install -g @angular/cli
~~~

- Após a instalação dos pacotes necessários, insira o comando abaixo para rodar a aplicação.

~~~
ng serve
~~~

- Agora coloque a url `http://localhost:4200/` no seu navegador e explore a aplicação.

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