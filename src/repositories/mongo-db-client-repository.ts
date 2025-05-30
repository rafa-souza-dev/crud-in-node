import { ClientRepository } from "./client-repository.js";
import { ClientDocument, ClientModel } from "../infra/db/models.js";
import { Client } from "../domain/client.js";
import { ClientCreateInput, ClientUpdateInput } from "../domain/client.types.js";

export class MongoClientRepository implements ClientRepository {
    private static instance: MongoClientRepository;

    private constructor() { }

    static getInstance(): MongoClientRepository {
        if (!MongoClientRepository.instance) {
            MongoClientRepository.instance = new MongoClientRepository();
        }

        return MongoClientRepository.instance;
    }

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

    async create(data: ClientCreateInput): Promise<Client> {
        const clientDoc = new ClientModel(data);
        const saved = await clientDoc.save();

        return this.toDomain(saved);
    }

    async update(id: string, data: ClientUpdateInput): Promise<Client> {
        const updated = await ClientModel.findByIdAndUpdate(id, data, { new: true });

        return this.toDomain(updated!);
    }

    async findById(id: string): Promise<Client | null> {
        const clientDoc = await ClientModel.findById(id);

        return clientDoc ? this.toDomain(clientDoc) : null;
    }

    async findAll(): Promise<Client[]> {
        const clients = await ClientModel.find();

        return clients.map(this.toDomain);
    }
}
