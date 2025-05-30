# Crud in Node.js

## Como rodar a aplicação

Basta ter o *docker* e o *docker-compose* instalados, e então executar o seguinte comando no terminal:

```bash
docker compose up -d
```

Se tudo der certo, você irá conseguir acessar o swagger da aplicação neste endereço:
http://localhost:3000/api-docs/#/

## Como executar os testes

Após subir a aplicação com *docker*, você pode entrar no container *app* e rodar os testes. No terminal, execute:

```bash
docker compose exec app sh
```

Em seguida:

```bash
npm run test
```
