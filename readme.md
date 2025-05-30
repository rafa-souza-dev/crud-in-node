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

## Arquitetura
O código foi ao máximo pensado em implementar os **princípios S.O.L.I.D**, o que resulta naturalmente em algo semelhante a **clean architecture**. Esses dois termos convergem para o mesmo caminho: dependência por abstrações. O código está divido em várias camadas, sendo que as mais internas não têm ideia da existência das mais externas. Ao invés disso, cada camada mais interna depende de alguma abstração. Segue um exemplo:

```typescript
export class RetrieveClient {
    constructor(
        private repository: ClientRepository,
        private cacheService: CacheService | null = null
    ) { }

    async handle(id: string): Promise<{ client: Client }> {
        const CACHE_KEY = `client:${id}`;
        const TTL = 30;
        const cachedResult = await this.getResultFromCache(CACHE_KEY);

        if (cachedResult) {
            return { client: parseWithDate(cachedResult) }
        }

        const client = await this.repository.findById(id);

        if (!client) {
            throw new NotFoundError({ message: 'Cliente não encontrado' });
        }

        await this.setInCache(CACHE_KEY, JSON.stringify(client), TTL)

        return { client };
    }

    private async getResultFromCache(key: string) {
        if (this.cacheService) {
            const cachedResult = await this.cacheService.get(key);

            return cachedResult;
        }

        return null;
    }

    private async setInCache(key: string, value: string, ttl: number) {
        if (this.cacheService) {
            await this.cacheService.set(key, value, ttl)
        }
    }
}
```

Este é um caso de uso que foi desenvolvido com o propósito de retornar um cliente baseado em seu *id*. As dependências desse caso de uso são `ClientRepository` e `CacheService`. Duas interfaces. Isso levanta o princípio de **dependency inversion**, garantindo que o código principal que contém as regras de negócio não precisa ser alterado se as implementações das camadas mais externas mudarem. Não importa se o serviço de cache é redis ou memcached, pra este caso de uso tanto faz.

### Repository pattern
Foi usado o padrão de repositórios para definir uma interface em comum entre todas as integrações com bancos de dados existentes na aplicação.

```typescript
export interface ClientRepository {
    create: (data: ClientCreateInput) => Promise<Client>;
    update: (id: string, data: ClientUpdateInput) => Promise<Client>;
    findById: (id: string) => Promise<Client | null>;
    findByEmailOrPhone: (email?: string, phone?: string) => Promise<Client | null>;
    findAll: () => Promise<Client[]>;
}
```

De novo, a aplicação continua dependendo de abstrações. Não importa se é *mongodb* ou *postgres*.

### MongoDB com mongoose

Utilizei o pacote **mongoose** para fazer a integração de node.js com mongodb. Apesar do mongoose gerar seus próprios modelos, isso não impede de criar uma classe capaz de implementar a interface base **ClientRepository**. Ficou assim:

```typescript
export class MongoClientRepository implements ClientRepository {
    ...

    async create(data: ClientCreateInput): Promise<Client> {
        const clientDoc = new ClientModel(data);
        const saved = await clientDoc.save();

        return this.toDomain(saved);
    }

    async update(id: string, data: ClientUpdateInput): Promise<Client> {
        const updated = await ClientModel.findByIdAndUpdate(id, data, { new: true });

        return this.toDomain(updated!);
    }
    ...
```

Sempre convertendo os objetos para a classe **Client**. Na arquitetura limpa, as entidades são o centro de tudo. Isso foi feito com uma função chamada **toDomain**, o nome expressa relação com domínio:

```typescript
private toDomain(doc: ClientDocument): Client {
    return new Client({
        id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
    });
}
```

### Singleton pattern
Foi usado o padrão de projeto **singleton** com o objetivo de usar sempre o mesmo objeto em memória nos repositórios concretos. Conversa muito bem com padrão de repositórios.

```typescript
export class MongoClientRepository implements ClientRepository {
    private static instance: MongoClientRepository;

    private constructor() { }

    static getInstance(): MongoClientRepository {
        if (!MongoClientRepository.instance) {
            MongoClientRepository.instance = new MongoClientRepository();
        }

        return MongoClientRepository.instance;
    }

    ...
```

O construtor é travado para que as partes do código que usam essa classe sejam obrigados a usar o método **getInstance**, garantindo unicidade de instância.

### Factory method pattern
Foi usado o padrão de método de fábrica para auxiliar a criação dos casos de uso. Segue exemplo:

```typescript
export function generateCreateClientForTests(baseData: Client[] = []) {
    const repository = new InMemoryClientRepository(baseData);

    return new CreateClient(repository);
}

export async function generateCreateClientDefault() {
    const repository = MongoClientRepository.getInstance();
    const queueService = await RabbitMQService.getInstance();

    return new CreateClient(repository, queueService);
}
```

Como os casos de uso podem ter dependências diferentes, faz sentido uma centralização da criação desses objetos. Por exemplo, pra testes não é necessário que o caso de uso tenha um serviço do *rabbitmq*, então há uma fábrica separada sem essa dependência.

### Error handling
Foi adicionado um handler global de erros padronizados para a aplicação, segue:

```typescript
export function globalErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    logger.error(err.stack);

    if (err instanceof DefaultError) {
        const errorResponse = err.toResponse();

        res.status(errorResponse.status_code).send(errorResponse);

        return;
    }

    const internalError = new InternalServerError({ cause: err })
    const internalErrorResponse = internalError.toResponse()
    logger.error(internalError)

    res.status(internalErrorResponse.status_code).send(internalErrorResponse);
}
```

Fazendo uso da api do *express*, esse handler verifica se a instância do erro é `DefaultError`. Isso porque todos os erros padronizados herdam dessa mesma classe. No *swagger*, todos os possíveis erros estão bem documentados.

### Cache com redis
Há um cache com 30 segundos de duração para a listagem de clientes e para a consulta de um cliente por id. São essas rotas:

```typescript
GET /api/clients
GET /api/clients/:id
```

Então, caso faça uma alteração (criar ou editar um cliente), essa realidade só vai ser refletida nos endpoints acima daqui a 30 segundos. O serviço do redis foi também implementado baseado numa interface, segue:

```typescript
export interface CacheService {
    get: (key: string) => Promise<string | null>
    set: (key: string, value: string, ttl: number) => Promise<void>
}

export class RedisCacheService implements CacheService {
    private static instance: RedisCacheService | null = null;
    private redis: Redis;

    private constructor(host = redisHost, port = redisPort) {
        this.redis = new Redis({
            host,
            port,
        });
    }
    ...
```

### Consumo de fila com RabbitMQ
Há um serviço rabbitmq que é hospedado junto com a aplicação. Para acessar o painel de gerenciamento basta clicar nesse link: http://localhost:15672/
Username: **guest**
Password: **guest**

A implementação do *rabbitmq* foi muito simples, confesso que faltou criatividade. Há uma interface que é implementada por **RabbitMQService**:

```typescript
export interface QueueService {
    sendToQueue: (message: string, queue?: string) => Promise<void>;
    consume: (callback: (msg: string) => void, queue?: string) => Promise<void>
}

export class RabbitMQService implements QueueService {
    private static instance: RabbitMQService | null = null;
    private connection!: ChannelModel;
    private channel!: Channel;
    private queue = 'clients_queue';

    private constructor(private url: string = rabbitMqUrl) { }
    ...
```

Quando um cliente é adicionado via `POST /api/clients` uma mensagem é enviada à fila **clients_queue**. Em seguida, um **worker** consome e processa essa mensagem, fazendo nada mais nada menos que um log via pino:

```typescript
const rabbitMQ = await RabbitMQService.getInstance();

await rabbitMQ.consume((message) => {
    logger.info(`Message was received: ${message}`);
});
```

### Testes automatizados & TDD
Utilizei a ferramenta **vitest** para criar testes unitários para todos os casos de uso da aplicação. Além de ter uma forte integração com **typescript**, vitest é extremamente rápido. Você pode encontrar os arquivos de teste ao lado dos arquivos de casos de uso. Gosto de manter os testes próximos ao código principal, já que a maior parte do tempo estou mexendo neles. Quando tenho exata certeza de onde quero chegar, costumo usar a metodologia **TDD**. Primeiro se escreve os testes, depois alinha a implementação e, em seguida, refatora. A estrutura dos testes que mais uso é a de termos padronizados como **with** e **when**. Esses termos representam setup e ação, respectivamente. Segue exemplo:

```typescript
describe('with conflict email', () => {
    const data: ClientCreateInput = {
        name: 'Juvenal',
        email: 'juvenal2@email.com',
        phone: '(87) 9 9999-9999'
    }

    describe('when calls create method', () => {
        it('should throw an error if client has conflict data', async () => {
            await expect(useCase.handle(data)).rejects.toThrow();
        });
    })
});
```

### CI - Continuos Integration
Criei um simples **workflow** para ser executado no **github actions** que simplesmente baixa as dependências da aplicação e executa os testes automatizados. Não precisa nem de build nesse caso, já que estou usando o **tsx** para executar código **typescript** diretamente. Com certeza eu não faria isso em produção, sei que o ideal é transpilar de alguma forma para **javascript**, mas como o projeto não vai ser publicado achei melhor manter o simples. As **pipelines** são executadas ao subir código na branch main, seja por **push** ou por **pull request**. Segue um exemplo de pipeline que rodou com sucesso:
https://github.com/rafa-souza-dev/crud-in-node/actions/runs/15339363032/job/43162506055
