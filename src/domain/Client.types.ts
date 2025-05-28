import { BaseEntityProps } from "./BaseEntity.types.js"

export type ClientProps = BaseEntityProps & {
    name: string;
    email: string;
    phone: string;
}

export type ClientSerializer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
}

export type ClientCreateInput = {
    name: string;
    email: string;
    phone: string;
}

export type ClientUpdateInput = Partial<ClientCreateInput>
