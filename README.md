It's an API (GoBarber backend)

Steps to run:

1 - install node_modules: "yarn"

2 - Initialized docker ( Redis, PostgreSQL and Mongodb)

3 - In .env choose STORAGE_DRIVER (s3 or disk) and choose MAIL_PROVIDER (ses or ethereal)

4 - Run application with "yarn dev:server"

# Recuperação de senha

**RF** // funcionalidades para recuperar senha

- O usuário deve poder recuperar sua senha, informando o seu email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar a sua senha

**RNF** // não ligadas diretamente as regras de negócio

- Utilizar Mailtrap para testar envio de emails no ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de emails deve acontecer em segundo plano (background job)


**RN** //

- o link enviado por email para resetar senha, deve expirar em 2h;
- o usuário precisa confirmar a nova senha ao resetar sua senha;



# Atualização do perfil

**RF**

-O Usuário deve poder atualizar o seu perfil(nome, email e senha)


**RN**

- O usuário não pode alterar o seu email para um email já utilizado;
- Para atualizar a sua senha, o usuário de informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;



# Painel do Prestador

**RF**

  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder vosualizar as notificações não lidas

**RNF**

  - Os agendamentos do prestador do dia devem ser armazenados em cache;
  - As notificações do prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

  - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar



# Agendamento dos Serviços


**RF**

- O Usuário deve poder listar todos os prestadores de serviço cadastrados
- O Usuário deve poder listar os dias e horários disponíveis do més de um prestador selecionado
- O Usuário deve poder listar horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache;


**RN**

- Cada agendamento deve durar uma hora
- Os agendamentos devem estar disponíveis entre às 8h às 18h
- Os usuários não podem agendar em um horário já marcado
- O usuário não pode agendar serviços em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo

