import { BaseEntityProps } from "./BaseEntity.types.js";

export class BaseEntity {
    constructor(private props: BaseEntityProps) { };

    get id(): number {
        return this.props.id;
    }

    set id(value: number) {
        this.props.id = value;
        this.updateCurrentDate();
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    protected updateCurrentDate() {
        this.props.updatedAt = new Date();
    }
}
