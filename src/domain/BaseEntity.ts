import { BaseEntityProps } from "./BaseEntity.types.js";

export class BaseEntity {
    constructor(private props: BaseEntityProps) { };

    get id(): number {
        return this.props.id;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }
}
