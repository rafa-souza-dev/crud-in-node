export class BaseEntity {
    constructor(
        protected id: number,
        protected createdAt: Date,
        protected updatedAt: Date
    ) { }
}
