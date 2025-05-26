import { BaseEntity } from "./BaseEntity.js";

export class Client extends BaseEntity {
    constructor(
        id: number,
        createdAt: Date,
        updatedAt: Date,
        private name: string,
        private email: string,
        private phone: string
    ) {
        super(id, createdAt, updatedAt);
    }

    get Id(): number {
        return this.Id;
    }

    get Name(): string {
        return this.name;
    }

    set Name(value: string) {
        this.name = value;
    }

    get Email(): string {
        return this.email;
    }

    get CreatedAt(): Date {
        return this.CreatedAt;
    }

    get UpdatedAt(): Date {
        return this.UpdatedAt;
    }

    set UpdatedAt(date: Date) {
        this.UpdatedAt = date;
    }

    set Email(value: string) {
        this.email = value;
    }

    get Phone(): string {
        return this.phone;
    }

    set Phone(value: string) {
        this.phone = value;
    }
}
