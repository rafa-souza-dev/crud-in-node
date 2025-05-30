import { BaseEntity } from "./base-entity.ts";
import { ClientProps, ClientSerializer } from "./client.types.ts";

export class Client extends BaseEntity {
    constructor(
        private clientProps: ClientProps,
    ) {
        super({ id: clientProps.id, createdAt: clientProps.createdAt, updatedAt: clientProps.updatedAt });
    }
    get name(): string {
        return this.clientProps.name;
    }

    set name(value: string) {
        this.clientProps.name = value;
        this.updateCurrentDate();
    }

    get email(): string {
        return this.clientProps.email;
    }

    set email(value: string) {
        this.clientProps.email = value;
        this.updateCurrentDate();
    }

    get phone(): string {
        return this.clientProps.phone;
    }

    set phone(value: string) {
        this.clientProps.phone = value;
        this.updateCurrentDate();
    }

    static serialize(client: Client): ClientSerializer {
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            created_at: client.createdAt.toISOString(),
            updated_at: client.updatedAt.toISOString()
        }
    }

    static serializeAll(clients: Client[]): ClientSerializer[] {
        return clients.map(this.serialize)
    }

    toJSON() {
        return this.clientProps;
    }
}
