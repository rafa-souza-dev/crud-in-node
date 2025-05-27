import { BaseEntityProps } from "./BaseEntity.types.js"

export type ClientProps = BaseEntityProps & {
    name: string;
    email: string;
    phone: string;
}

export type ClientCreateInput = {
    name: string;
    email: string;
    phone: string;
}

export type ClientUpdateInput = Partial<ClientCreateInput>
